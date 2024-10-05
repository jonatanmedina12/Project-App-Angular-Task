import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm!: FormGroup;
  isEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.data);
    }
  }

  initForm(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: [null],
      completed: [false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.data) {
        const updatedTask = { ...this.data, ...this.taskForm.value };
        this.taskService.updateTask(this.data.id, updatedTask).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating task:', error);
          }
        );
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error creating task:', error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}



