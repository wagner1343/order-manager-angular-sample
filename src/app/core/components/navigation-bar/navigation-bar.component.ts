import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {PageNameService} from '../../../services/page-name.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router, public pageNameService: PageNameService) {

  }

}
