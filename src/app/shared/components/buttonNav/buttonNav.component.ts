import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './buttonNav.component.html',
  styleUrl: './buttonNav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonNavComponent {

  public rutas = routes.flat().filter(ruta => ruta && ruta.path != '' && !ruta.path?.includes('admin'));

  constructor(private offcanvasService: NgbOffcanvas) {

  }

  openNoKeyboard(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { keyboard: false, panelClass: 'bg-dark' });
  }
}
