import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './component/car/car.component';
import { CarListComponent } from './component/car/car-list/car-list.component';
import { CreateEditComponent } from './component/car/create-edit/create-edit.component';
import { GuevaraNuevoComponent } from './component/rent/guevara-nuevo/guevara-nuevo.component';
import { GuevaraListComponent } from './component/rent/guevara-list/guevara-list.component';

const routes: Routes = [
  {
    path: 'Guevara', component: CarComponent, children: [
      {
      path:'nuevo', component: CreateEditComponent
      },
      {
        path:'listado', component: CarListComponent
      },

      {
        path:'nuevo-rent', component: GuevaraNuevoComponent
      },
      {
        path:'listado-rent', component: GuevaraListComponent
      },
      
    ]
    
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
