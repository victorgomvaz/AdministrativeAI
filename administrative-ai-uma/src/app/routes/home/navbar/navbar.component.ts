import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userData: any;
  username: string = '';
  

  constructor(private router: Router, private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.authService.observeAuthState().subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']); // Redirige al login si no hay usuario
      } else {
        this.userData = user;
        this.username = user.displayName || user.email || 'Usuario Anónimo';
        console.log('Datos del usuario:', this.userData);
      }
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
