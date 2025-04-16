import { Routes } from '@angular/router';
import { ChatComponent } from './routes/home/chat/chat.component';
import { HomeComponent } from './routes/home/home.component';
import { InicioComponent } from './routes/home/inicio/inicio.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./routes/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
        { path: 'chat', component: ChatComponent }, // Ruta para el chat
        { path: 'inicio', component: InicioComponent }, // Ruta para inicio
        { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirección por defecto
        ],
    },
    {
        path: 'login',
        loadComponent: () => import('./routes/login/login.component').then(m => m.LoginComponent)
    }
];
