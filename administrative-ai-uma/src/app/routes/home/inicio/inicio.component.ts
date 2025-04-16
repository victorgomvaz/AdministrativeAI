import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private router: Router, private authService: AuthenticateService) {}

  abrirChat(){
    this.router.navigate(['/home/chat']);
  }
}
