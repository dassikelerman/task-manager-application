import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../models/models';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teams',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams implements OnInit{
  private teamsService = inject(TeamsService);
  teams = signal<Team[]>([]);
  isLoading = signal<boolean>(false);
  
  ngOnInit() {
    this.loadTeams();
  }
  
  loadTeams() {
    this.isLoading.set(true);
    this.teamsService.getTeams().subscribe({
      next: (data) => {
        this.teams.set(data); 
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('שגיאה בטעינת צוותים', err);
        this.isLoading.set(false);
      }
    });
  }

  showAddForm = signal(false);
  showAddMemberForm = signal<number | null>(null);

  addTeam(name: string) {
    if (!name) return;
    this.teamsService.createTeam(name).subscribe({
      next: (newTeam) => {
        this.teams.update(prev => [...prev, newTeam]);
        this.showAddForm.set(false); 
      }
    });
  }

  // פונקציה חדשה להוספת חבר לצוות
  addMemberToTeam(teamId: number, userId: string) {
    const userIdNumber = parseInt(userId);
    if (!userIdNumber || isNaN(userIdNumber)) {
      alert('נא להזין מספר ID תקין');
      return;
    }

    this.teamsService.addMemberToTeam(teamId, { userId: userIdNumber, role: 'member' }).subscribe({
      next: () => {
        // טוען מחדש את הצוותים כדי לעדכן את מספר החברים
        this.loadTeams();
        this.showAddMemberForm.set(null);
      },
      error: (err) => {
        console.error('שגיאה בהוספת חבר לצוות', err);
        alert('שגיאה בהוספת חבר לצוות');
      }
    });
  }
}
