import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../../../model/car';
import { CarService } from '../../../service/car.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss'
})
export class CreateEditComponent {
  form: FormGroup = new FormGroup({});
  car: Car = new Car();
  mensaje: string = "";
  Todate = new Date();
  constructor(private carService: CarService, private router: Router, private route : ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        plate: new FormControl('', [Validators.required , Validators.minLength(5)]),
        brand: new FormControl('', [Validators.required]),
        fabricationDate: new FormControl(),
        model: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required, Validators.min(1)])
      }
    );
  }

  aceptar(){
    this.car.plate = this.form.value['plate'];
    this.car.brand = this.form.value['brand'];
    this.car.fabricationDate = this.form.value['fabricationDate'];
    this.car.model = this.form.value['model'];
    this.car.price = this.form.value['price'];

    //date
    const maxDate = new Date;
    maxDate.setDate(this.Todate.getDate()+1);
    maxDate.setHours(0,0,0,0);

    const invalidDate = this.form.get('fabricationDate')?.value >= maxDate;


    if(this.form.valid || invalidDate){

      if(invalidDate){
        this.form.get('fabricationDate')?.setErrors({invalidDate:true});
      }else{
        this.carService.create(this.car).subscribe((data)=>{
          this.carService.list().subscribe(data => {
            this.carService.setList(data);//enviando la lista al suscriptor
          })
        });
        this.router.navigate(['Guevara/listado']);
      }
    }else{
      this.openSnackBar("Agregue todos los campos requeridos", "Cerrar");
    }
  
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
