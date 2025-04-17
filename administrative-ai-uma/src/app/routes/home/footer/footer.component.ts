import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router: Router, private authService: AuthenticateService) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
