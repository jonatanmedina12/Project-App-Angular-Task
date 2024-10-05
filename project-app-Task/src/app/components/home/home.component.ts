import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  features = [
    { icon: 'check_circle', title: 'Create and manage tasks', description: 'Easily add, edit, and organize your tasks' },
    { icon: 'schedule', title: 'Set priorities and due dates', description: 'Never miss a deadline with our reminder system' },
    { icon: 'trending_up', title: 'Track your progress', description: 'Visualize your productivity with intuitive charts' },
    { icon: 'group', title: 'Collaborate with team members', description: 'Share tasks and work together efficiently' }
  ];
  constructor(public authService:AuthService) {
    
  }
}
