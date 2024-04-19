import { Component, OnInit, inject, signal } from '@angular/core';
import { OtpService } from '../services/otp.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-otp',
  template: `
  <div class="flex items-center justify-center py-12 px-8 sm:px-6">
    <div class="max-w-md w-full space-y-12">
      <div>
        <h2 class="mt-6 text-center text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome {{ this.userEmail() }}
        </h2>
      </div>
      <p-toast escape="false"></p-toast>

      <form [formGroup]="form" class="mt-8 space-y-10">
        @if(!isOtpGenerated()){
          <div class="w-full flex justify-center">
            <p>Verify your account. We will send you an OTP code.</p>
          </div>
          
          <div class="w-full flex-wrap flex justify-center h-12">
            <p class="py-2">How long the code will live?</p>
            <select (change)="onIntervalChange($event)" class="w-full" formControlName="otp">
              @for(option of this.selectOptions; track $index){
                <option [value]="option.value" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4">{{option.name}}</option>
              }
            </select>
          </div>

          <button
            type="button"
            (click)="onGenerateOtp()"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Generate OTP
          </button>
        }
        @else{
          <input
            type="text"
            formControlName="otp"
            placeholder="Enter the OTP code"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4"
          />
        
          <button
            type="button"
            (click)="onVerifyOtp()"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Verify
          </button>
        }
      </form>
    </div>
  </div>
  `,
  styles: ''
})
export class OtpComponent implements OnInit {
  
  ///
  /// DI
  ///

  private messageService = inject(MessageService);  // toast
  private otpService = inject(OtpService);
  private userService = inject(UserService);
  private router = inject(Router);

  ///
  /// View Model
  ///

  protected userEmail = signal<string>('');
  protected isOtpGenerated = signal<boolean>(false);
  protected otpCode = signal<string>('');
  protected form = new FormGroup({
    otp: new FormControl('30', [Validators.required])
  });
  selectOptions = [
    { value: '30', name: '30 seconds' },
    { value: '60', name: '1 minute' },
    { value: '120', name: '2 minutes' }
  ];

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.userEmail.set(this.userService.userEmail());
  }

  ///
  /// Ui Events
  ///

  protected onGenerateOtp() {
    this.otpService.generateOtp(this.userEmail(), this.otpService.timeToExpire()).subscribe(
      (otpCode) => {
        this.isOtpGenerated.set(true);
        this.otpCode.set(otpCode);
        this.form.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `OTP Code generated! Your code is ${this.otpCode()} and expires after ${this.otpService.timeToExpire()} seconds.`, life: parseInt(this.otpService.timeToExpire()) * 1000});
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to generate OTP Code! Please try again.', life: 3000});
      }
    );
  }

  protected onVerifyOtp(){
    this.otpService.verifyOtp(this.userEmail(), this.form.get('otp')?.value?.trim()?? '').subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response, life: 3000});
        this.router.navigate(['profile']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.text, life: 3000});
      }
    );
  }

  protected onIntervalChange(event: any){
    this.otpService.timeToExpire.set(event.target.value);
  }

}
