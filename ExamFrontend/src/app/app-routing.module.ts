import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guard/admin.guard';
import { NormalGuard } from './services/guard/normal.guard';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { TempComponent } from './temp.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { PrequizInstructionsComponent } from './pages/user/prequiz-instructions/prequiz-instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserQuizDashboardComponent } from './pages/user/user-quiz-dashboard/user-quiz-dashboard.component';
import { UpdateProfileComponent } from './pages/profile/update-profile/update-profile.component';
import { ForgotPasswordComponent } from './pages/profile/forgot-password/forgot-password.component';


const routes: Routes = [

  // testing
  {
    path: 'Temp',
    component: TempComponent,
    pathMatch: 'full'
  },

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {          
        path: 'profile/update/:id',
        component: UpdateProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoriesComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizzesComponent,
      },
      {
        path: 'update-quiz/:qid',
        component: UpdateQuizComponent,
      },
      {
        path: 'questions/:qid/:title',
        component: ViewQuestionsComponent,
      },
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionsComponent,
      },
      {
        path: 'update-question/:questionid',
        component: UpdateQuestionComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: 'home',
        component: UserQuizDashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {          
        path: 'profile/update/:id',
        component: UpdateProfileComponent,
      },
      {
        path: 'load-quiz',
        component: LoadQuizComponent,
      },
      {
        path: 'load-quiz/:qid',
        component: LoadQuizComponent,
      },
      {
        path: 'instructions/:qid',
        component: PrequizInstructionsComponent,
      },
    ]
  },
  {
    path: 'start/:qid',
    component: StartComponent,
    canActivate: [NormalGuard],
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
