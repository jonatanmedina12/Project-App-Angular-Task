import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = ['name', 'description', 'completed', 'actions'];
  userId!: number;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  getUserIdFromLocalStorage(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // Convierte el objeto currentUser de string a un objeto JavaScript
      const user = JSON.parse(currentUser);
      this.userId = user.userId;
    }
  
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
   this.getUserIdFromLocalStorage();
    this.taskService.getTask(this.userId).subscribe(
      tasks => {
        this.dataSource = new MatTableDataSource(tasks);
      },
      error => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }
}
