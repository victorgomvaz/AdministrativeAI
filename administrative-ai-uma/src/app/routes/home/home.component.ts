import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserCredential } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {
  userData: any;
  username: string = '';
  message: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];

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

  sendMessage() {
    const msg = this.message.trim();
    if (!msg) return;

    this.messages.push({ text: msg, sender: 'user' });

    // Simular respuesta del bot
    setTimeout(() => {
      this.messages.push({ text: 'Esta es una respuesta automática del bot.', sender: 'bot' });
    }, 500);

    this.message = '';
  }

  
}
