import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { Top10Component } from './pages/top10/top10.component';
import { GraphComponent } from './pages/graph/graph.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ViewImageComponent } from './pages/view-image/view-image.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit_profile', component: EditProfileComponent },
  { path: 'top10', component: Top10Component },
  { path: 'graph/:id', component: GraphComponent },
  { path: 'view_profile/:id', component: ViewProfileComponent },
  { path: 'view_image', component: ViewImageComponent },
  { path: 'admin', component: AdminComponent },
];
