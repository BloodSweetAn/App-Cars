import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rent } from '../../../model/rent';
import { RentService } from '../../../service/rent.service';


@Component({
  selector: 'app-guevara-list',
  templateUrl: './guevara-list.component.html',
  styleUrl: './guevara-list.component.scss'
})
export class GuevaraListComponent implements OnInit {
  lista: Rent[] = [];
  displayedColumns = ['id', 'clientName', 'rentDays', 'rentDate', 'pricePerDay' ,'plate', 'brand' ,'insurance', 'priceTotal', 'aniostotal','fechafin'];
  dataSource = new MatTableDataSource<Rent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rentService: RentService) {
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.rentService.list().subscribe({
      next:(data) =>{
        this.dataSource.data = data;
      }
    });
    this.rentService.getList().subscribe(data => {
      this.dataSource.data=data;
    });
    //this.authorService.list().subscribe(data=> this.dataSource = new MatTableDataSource(data));
  }

  calcularAntiguedad(rentDate: Date): number {
    const currentYear = 2024;
    const rentYear = new Date(rentDate).getFullYear();
    return currentYear - rentYear;
  }

  calcularFechaFin(rentDate: Date, rentDays: number): Date {
    const startDate = new Date(rentDate);
    startDate.setDate(startDate.getDate() + rentDays);
    return startDate;
  }

  filtrar(e:any){
    this.dataSource.filter = e.target.value.trim();
  }
}
