import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Car } from '../model/car';

const baseUrl = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url = `${baseUrl}`
  private listaCambio = new Subject<Car[]>()
  constructor(private http: HttpClient) { }

  list(): Observable<any>{
    console.log(this.url);
    return this.http.get<Car[]> (this.url + "/cars");
  }

  create(car: Car){
    return this.http.post(this.url + "/cars", car);
  }

  setList(listaNueva: Car[]){
    this.listaCambio.next(listaNueva);
  }
    
  getList(){
    return this.listaCambio.asObservable();
  }
}
