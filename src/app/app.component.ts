import { Component, Output } from '@angular/core';
import { ScrollnavService } from './services/scrollnav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'atoyansk';
  navIsAffix: boolean;

  constructor(private scrollserv: ScrollnavService) {
    this.getData();
  }

  getData() {
    this.scrollserv.scrollChange.subscribe(value => {
        this.navIsAffix = value;
        console.log(this.navIsAffix);
      });
  }
}
