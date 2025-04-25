import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, 
    FormsModule, 
    Dialog, 
    ButtonModule, 
    InputTextModule, 
    AvatarModule],
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  userData: any;
  username: string = '';
  message: string = '';
  fotoPerfil: string = 'https://www.gravatar.com/avatar/';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  loading: boolean = false;

  visible: boolean = false;

  constructor(private router: Router, private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.authService.observeAuthState().subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']); // Redirige al login si no hay usuario
      } else {
        this.visible = true;
        this.userData = user;
        if( user.photoURL) {
          this.fotoPerfil = user.photoURL;
        }
        this.username = user.displayName || user.email || 'Usuario Anónimo';
        console.log('Datos del usuario:', this.userData);
      }
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
