import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'atoyansk';
  navIsAffix: boolean;

  scrollPass($event) {
    this.navIsAffix = $event;
    console.log(this.navIsAffix);
  }
}
