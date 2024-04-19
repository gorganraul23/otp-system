import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  template: `
    <div class="w-full flex justify-center mt-20">
      <p-toast></p-toast>
      <p class="text-2xl">Welcome to your profile!</p>
    </div>
    
  `,
  styles: ''
})
export class ProfileComponent implements OnInit{

  ///
  /// DI
  ///

  private messageService = inject(MessageService);  // toast
  
  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful!', life: 3000});
  }

}
