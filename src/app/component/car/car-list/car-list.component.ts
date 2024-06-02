import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Car } from '../../../model/car';
import { CarService } from '../../../service/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent {
  lista: Car[] = [];
  displayedColumns = ['id', 'plate', 'brand', 'fabricationDate', 'model' ,'price'];
  dataSource = new MatTableDataSource<Car>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private carService: CarService) {
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.carService.list().subscribe({
      next:(data) =>{
        this.dataSource.data = data;
      }
    });
    this.carService.getList().subscribe(data => {
      this.dataSource.data=data;
    });
    //this.authorService.list().subscribe(data=> this.dataSource = new MatTableDataSource(data));
  }
}
