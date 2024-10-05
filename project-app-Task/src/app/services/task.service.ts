import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { CreateTasksDto } from '../model/create-tasks-dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5088/api/Tareas'; // Adjust this to your API URL

  constructor(private http: HttpClient) { }



  getTask(id: number): Observable<Task[]> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Task[]>(url);
  }

  createTask(taskData: CreateTasksDto): Observable<CreateTasksDto> {
    return this.http.post<CreateTasksDto>(this.apiUrl, taskData);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }



}
