import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserCredential } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class HomeComponent implements OnInit {
  userData: any;

  constructor(private router: Router, private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.authService.observeAuthState().subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']); // Redirige al login si no hay usuario
      } else {
        this.userData = user;
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
