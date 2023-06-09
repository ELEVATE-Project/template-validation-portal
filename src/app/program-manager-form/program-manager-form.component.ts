import { Component } from '@angular/core';

@Component({
  selector: 'app-program-manager-form',
  templateUrl: './program-manager-form.component.html',
  styleUrls: ['./program-manager-form.component.sass']
})
export class ProgramManagerFormComponent {
  ssoUser = 'YES';
  loginId = '';
  dikshaUserId = 'dikshauser_5xco';
  onSubmit() {
    
    const formData = {
      ssoUser: this.ssoUser,
      loginId: this.loginId,
      dikshaUserId: this.dikshaUserId
    };

  
  }
}
