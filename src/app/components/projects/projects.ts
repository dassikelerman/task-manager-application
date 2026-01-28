import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router, NavigationEnd } from '@angular/router'; 
import { ProjectsService } from '../../services/projects.service';
import { TeamsService } from '../../services/teams.service';
import { Project, Team } from '../../models/models';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);
  private teamsService = inject(TeamsService);
  
  projects = signal<Project[]>([]);
  teams = signal<Team[]>([]);
  teamId = signal<number | null>(null); 
  isLoading = signal(false);
  showAddForm = signal(false);

  ngOnInit() {
    // טוען בפעם הראשונה
    this.loadTeamsAndProjects();
    
    // מאזין לניווט - כל פעם שעוברים לעמוד הזה, טוען מחדש
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url.includes('/teams/') && this.router.url.includes('/projects')) {
        this.loadTeamsAndProjects();
      }
    });
  }

  loadTeamsAndProjects() {
    const idFromUrl = this.route.snapshot.paramMap.get('id');
    if (idFromUrl) {
      this.teamId.set(Number(idFromUrl));
      this.loadTeams();
      this.loadProjects();
    }
  }

  loadTeams() {
    this.teamsService.getTeams().subscribe({
      next: (data) => this.teams.set(data)
    });
  }

  loadProjects() {
    const id = this.teamId();
    if (!id) return;

    this.isLoading.set(true);
    this.projectsService.getProjectsByTeam(id).subscribe({
      next: (data) => {
        const filteredData = data.filter((p: Project) => p.team_id === id);
        this.projects.set(filteredData);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  addProject(name: string, description: string) {
    const id = this.teamId();
    if (!id || !name) return;

    this.projectsService.createProject(id, name, description).subscribe({
      next: (newProj) => {
        this.projects.update(prev => [...prev, newProj]);
        this.showAddForm.set(false);
      }
    });
  }

  getSelectedTeamName(): string {
    const id = this.teamId();
    if (!id) return '';
    const team = this.teams().find(t => t.id === id);
    return team?.name || '';
  }
}
