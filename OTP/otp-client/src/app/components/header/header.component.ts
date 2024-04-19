import { Component, inject } from '@angular/core';
import { OtpService } from '../../services/otp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
  <div class="bg-indigo-600 p-4 text-white h-20 flex items-center px-10 justify-between font-bold min-w-full">
    <button type="button"
      (click)="onHome()"
      class="w-16 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
    >
      Home
    </button>
    <h1 class="text-center m-0 text-xl md:text-2xl justify-start">OTP Challenge App</h1>
  </div>
  `,
  styles: [

  ]
})
export class HeaderComponent {

  private router = inject(Router);

  protected onHome(){
    this.router.navigate(['/']);
  }

}
