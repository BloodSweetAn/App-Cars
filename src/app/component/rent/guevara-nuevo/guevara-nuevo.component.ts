import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Rent } from '../../../model/rent';
import { RentService } from '../../../service/rent.service';

@Component({
  selector: 'app-guevara-nuevo',
  templateUrl: './guevara-nuevo.component.html',
  styleUrl: './guevara-nuevo.component.scss'
})
export class GuevaraNuevoComponent {
  form: FormGroup = new FormGroup({});
  rent: Rent = new Rent();
  mensaje: string = "";
  Todate = new Date();
  constructor(private rentService: RentService, private router: Router, private route : ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        clientName: new FormControl('', [Validators.required , Validators.minLength(5)]),
        rentDays: new FormControl('', [Validators.required, Validators.min(0)]),
        rentDate: new FormControl(),
        pricePerDay: new FormControl('', [Validators.required]),
        plate: new FormControl('', [Validators.required]),
        brand: new FormControl('', [Validators.required]),
        insurance: new FormControl('', [Validators.required])
      }
    );
  }

  aceptar(){
    this.rent.clientName = this.form.value['clientName'];
    this.rent.rentDays = this.form.value['rentDays'];
    this.rent.rentDate = this.form.value['rentDate'];
    this.rent.pricePerDay = this.form.value['pricePerDay'];
    this.rent.plate = this.form.value['plate'];
    this.rent.brand = this.form.value['brand'];
    this.rent.insurance = this.form.value['insurance'];

    //date
    const maxDate = new Date;
    maxDate.setDate(this.Todate.getDate()+1);
    maxDate.setHours(0,0,0,0);

    const invalidDate = this.form.get('rentDate')?.value <= maxDate;
    const invalidRent = this.form.get('rentDays') ?.value <= 0;

    if(this.form.valid || invalidRent || invalidDate){

      if(invalidRent){
        this.openSnackBar("Los dias de rentas no pueden ser en negativo", "Cerrar");
      }else if(invalidDate){
        this.form.get('rentDate')?.setErrors({invalidDate:true});
        this.openSnackBar("La fecha no puede ser menor que la actual", "Cerrar");
      }else{
        this.rentService.create(this.rent).subscribe((data)=>{
          this.rentService.list().subscribe(data => {
            this.rentService.setList(data);//enviando la lista al suscriptor
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
