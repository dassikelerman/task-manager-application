import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Teams } from './components/teams/teams';
import { Projects } from './components/projects/projects';
import { Tasks } from './components/tasks/tasks';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' }, 
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  // נתיבים מוגנים:
  { path: 'teams', component: Teams, canActivate: [authGuard] }, 
  { path: 'teams/:id/projects', component: Projects, canActivate: [authGuard] },
  { path: 'projects/:projectId/tasks', component: Tasks, canActivate: [authGuard] }
];
