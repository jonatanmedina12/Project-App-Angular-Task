import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../model/login-dto';
import { AuthResponse } from '../model/auth-response';
import { RegisterDto } from '../model/register-dto';
import { AuthRegister } from '../model/auth-register';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthResponse | null>;

  public currentUser! :Observable<AuthResponse  | null>

  private jwtHelper = new JwtHelperService();

  private apiUrl = `http://localhost:5088/api/auth`;



  constructor(private http:HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<AuthResponse  | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
    
   }



   public get currentUserValue():AuthResponse  | null{
    return this.currentUserSubject.value;
   }

   login (LoginDto:LoginDto):Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`,LoginDto)
      .pipe(map(Response=>{
        localStorage.setItem('currentUser',JSON.stringify(Response));
        this.currentUserSubject.next(Response);
        return Response
      }))
   }
   register (RegisterDto:RegisterDto):Observable<AuthRegister>{
    return this.http.post<AuthRegister>(`${this.apiUrl}/registrar`,RegisterDto)
    .pipe(map(Response =>{
      return Response
    }))
   }
   logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
   }
   isAuthenticated():boolean{
    const user = this.currentUserValue;
    return !!user && !!user.token && !this.jwtHelper.isTokenExpired(user.token)
   }
   getAuthToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.token : null;
  }
  isLoggedIn(): boolean {
    // Obtiene el objeto currentUser del localStorage
    const currentUser = localStorage.getItem('currentUser');
  
    if (currentUser) {
      // Convierte el objeto currentUser de string a un objeto JavaScript
      const user = JSON.parse(currentUser);
      
      // Verifica si el objeto user tiene la propiedad token
      return !!user.token;
    }
  
    // Si no hay un currentUser en el localStorage, retorna false
    return false;
  }
}
