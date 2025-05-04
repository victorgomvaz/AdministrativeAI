import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { GptService } from '../../../services/gpt.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, 
    FormsModule, 
    Dialog, 
    ButtonModule, 
    InputTextModule, 
    AvatarModule],
  standalone: true,
  animations: [
    trigger('slideIn', [
      transition('bot => void, void => bot', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('user => void, void => user', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ],
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

  constructor(private router: Router, private authService: AuthenticateService, private gptService: GptService) {}

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
        this.mensajesBienvenida();

      }
    });
  }

  sendMessage() {
    
    const msg = '<p>'+this.message.trim()+'</p>';
    if (!msg) return;
    this.message = '';
    this.messages.push({ text: msg, sender: 'user' });
    // Simular respuesta del bot
    
    this.gptService.askQuestion(msg).subscribe(response => {
      this.messages.push({ text: response.response, sender: 'bot' });
       // Limpiar el campo de entrada
    });
  }

  mensajesBienvenida() {
    this.messages.push({ text: '<p>Hola, soy el asistente de SCACIA. ¿En qué puedo ayudarte hoy?</p>', sender: 'bot' });
  }
}
