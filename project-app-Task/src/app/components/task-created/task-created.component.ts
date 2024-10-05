import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-task-created',
  templateUrl: './task-created.component.html',
  styleUrls: ['./task-created.component.css']
})
export class TaskCreatedComponent {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: [null],
      completed: [false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = +params['id'];
        this.loadTask(this.taskId);
      }
    });
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },
      error: (error) => {
        console.error('Error loading task', error);
        this.snackBar.open('Error loading task. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    const { name, description, completed } = this.taskForm.value;
  
    // Obtiene el objeto currentUser del localStorage
    const currentUser = localStorage.getItem('currentUser');
  
    let userId = 0;
    if (currentUser) {
      // Convierte el objeto currentUser de string a un objeto JavaScript
      const user = JSON.parse(currentUser);
      userId = user.userId;
    }
  
    const taskData = {
      name: name ?? '',
      description: description ?? '',
      completed: completed ?? false,
      idUser: userId
    };
  
    if (this.taskForm.valid) {
      
        this.taskService.createTask(taskData).subscribe({
          next: () => {
            this.snackBar.open('Task created successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            console.error('Error creating task', error);
            this.snackBar.open('Error creating task. Please try again.', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }



