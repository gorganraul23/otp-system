import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <div class="flex items-center justify-center py-12 px-8 sm:px-6">
    <div class="max-w-md w-full space-y-12">
      
      <div>
        <h2 class="mt-6 text-center text-2xl lg:text-3xl font-bold text-gray-900">
          Log in to Your Account
        </h2>
      </div>

      <form [formGroup]="this.form" class="mt-8 space-y-10">
        <input type="email" placeholder="Enter your email address" formControlName="email"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4" />
        <input type="password" placeholder="Enter your password" formControlName="password"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4" />
  
        <p-toast></p-toast>

        <button type="button" (click)="login()" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
          Continue
        </button>
  
      </form>
    </div>
  </div>
  `,
  styles: [

  ]
})
export class LoginComponent implements OnInit{

  ///
  /// DI
  ///

  private messageService = inject(MessageService);  // toast
  private userService = inject(UserService);
  private router = inject(Router);

  ///
  /// View Model
  ///

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ///
  /// Ui Events
  ///

  protected login(){
    const email = this.form.get('email')!.value?.trim();
    const password = this.form.get('password')!.value?.trim();
    this.userService.login(email?? '', password?? '').subscribe(
      (response: any) => {
        this.userService.userEmail.set(response.email);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successful!', life: 3000});
        this.router.navigate(['otp']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 3000});
      }
    );
  }

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.userService.userEmail.set('');
  }

}
