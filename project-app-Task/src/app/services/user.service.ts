import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateProfileDto } from '../model/update-profile-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5088/api/Account';

  constructor(private http: HttpClient) {}

  updateUser(userId: number, updateProfileDto: UpdateProfileDto): Observable<{ message: string; updatedUser: any }> {
    return this.http.put<{ message: string; updatedUser: any }>(`${this.apiUrl}/${userId}`, updateProfileDto);
  }

  
}
