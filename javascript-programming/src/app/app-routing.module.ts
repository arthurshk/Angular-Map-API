import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldComponent } from '../world/world.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/world', pathMatch: 'full' },  
  { path: 'world', component: WorldComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
