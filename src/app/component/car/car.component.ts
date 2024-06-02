import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent {

  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {

  }
}
