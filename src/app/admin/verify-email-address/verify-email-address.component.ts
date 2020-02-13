import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-verify-email-address',
  templateUrl: './verify-email-address.component.html',
  styleUrls: ['./verify-email-address.component.scss']
})
export class VerifyEmailAddressComponent implements OnInit {

  faRedoAlt = faRedoAlt;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
