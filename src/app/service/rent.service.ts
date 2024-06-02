import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Rent } from '../model/rent';

const baseUrl = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RentService {
  private url = `${baseUrl}`
  private listaCambio = new Subject<Rent[]>()
  constructor(private http: HttpClient) { }

  list(): Observable<any>{
    console.log(this.url);
    return this.http.get<Rent[]> (this.url + "/rents");
  }

  create(rent: Rent){
    return this.http.post(this.url + "/rents", rent);
  }

  setList(listaNueva: Rent[]){
    this.listaCambio.next(listaNueva);
  }
    
  getList(){
    return this.listaCambio.asObservable();
  }
}
