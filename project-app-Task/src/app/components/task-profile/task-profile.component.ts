import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateProfileDto } from 'src/app/model/update-profile-dto';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-task-profile',
  templateUrl: './task-profile.component.html',
  styleUrls: ['./task-profile.component.css']
})
export class TaskProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userId!: number;
  selectedFile: File | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private accountService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getUserIdFromLocalStorage();
    this.initializeForm();
  }

  getUserIdFromLocalStorage(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userId = user.userId;
    }
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      this.selectedFile = null;
    }
  }
  initializeForm() {
    this.profileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,20}$')]]
    });
  }

  getErrorMessage(formControlName: string): string {
    const formControl = this.profileForm?.get(formControlName);
    if (formControl?.hasError('required')) {
      return `${formControlName} is required`;
    } else if (formControl?.hasError('email')) {
      return 'Not a valid email address';
    } else if (formControl?.getError('minlength')) {
      return `${formControlName} must be at least ${formControl.getError('minlength')?.requiredLength} characters long`;
    } else if (formControl?.getError('maxlength')) {
      return `${formControlName} must be at most ${formControl.getError('maxlength')?.requiredLength} characters long`;
    } else if (formControl?.hasError('pattern')) {
      return `${formControlName} is not in the correct format`;
    } else {
      return 'Invalid input';
    }
  }

  onSubmit() {
    if (this.profileForm) {
      const updateProfileDto: UpdateProfileDto = {
        email: this.profileForm.get('email')?.value ?? '',
        photo: this.selectedFile ? this.selectedFile.name : '',
        country: this.profileForm.get('country')?.value ?? '',
        phoneNumber: this.profileForm.get('phoneNumber')?.value ?? ''
      };
  
      this.accountService.updateUser(this.userId, updateProfileDto).subscribe(
        (response) => {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open(error.message, 'Close', { duration: 3000 });
        }
      );
    }
  }
}