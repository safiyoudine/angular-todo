import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { PostCategoryComponent}  from "./components/post-category/post-category.component";

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent,title:"Dashboard"},
  {path:"category",component:PostCategoryComponent,title:"Category"},
  {path:"task",component:PostTaskComponent,title:"Task"},
  {path:"task/:id/edit",component:UpdateTaskComponent,title:"Edit Task"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
