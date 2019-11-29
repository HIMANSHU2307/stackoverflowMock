import { UserProfileComponent } from './user-profile/user-profile.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'questionspage', component: QuestionPageComponent },
  { path: 'userprofile/:id', component: UserProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
