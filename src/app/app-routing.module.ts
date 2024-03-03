import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MemberFormComponent} from "./member-form/member-form.component";
import {MemberComponent} from "./member/member.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventComponent} from "./event/event.component";
import {ToolsComponent} from "./tools/tools.component";
import {ArticleComponent} from "./article/article.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'create',
    pathMatch: 'full', //matching complet
    component: MemberFormComponent
  },
  {
    path: 'members',
    pathMatch: 'full',
    component: MemberComponent
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path:'**',
    redirectTo:'member'
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'events',
    pathMatch: 'full',
    component: EventComponent
  },
  {
    path: 'tools',
    pathMatch: 'full',
    component: ToolsComponent
  },
  {
    path: 'articles',
    pathMatch: 'full',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
