import { Component } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private authService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
    this.authService.observeAuthState().subscribe((user) => {
      if (user) {
        console.log('Usuario autenticado:', user);
        this.router.navigate(['/home']); // Redirige al home si el usuario está autenticado
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  login() {
    this.authService.signInWithGoogle().then((result) => {
      result.user?.getIdTokenResult().then((tokenResult) => {
        const expirationTime = new Date(tokenResult.expirationTime).getTime();
        const currentTime = new Date().getTime();
        const timeToExpire = expirationTime - currentTime;
  
        // Configura un temporizador para cerrar sesión automáticamente
        setTimeout(() => {
          this.logout();
        }, timeToExpire);
  
        // Navega al componente home
        this.router.navigate(['/home']);
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      this.authService.clearUser();
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  }
}
