import { Component, OnInit, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router, NavigationEnd } from '@angular/router'; 
import { ProjectsService } from '../../services/projects.service';
import { TeamsService } from '../../services/teams.service';
import { Project, Team } from '../../models/models';
import { FormsModule } from '@angular/forms';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);
  private teamsService = inject(TeamsService);
  private routeSubscription?: Subscription;
  private navigationSubscription?: Subscription;
  
  projects = signal<Project[]>([]);
  teams = signal<Team[]>([]);
  teamId = signal<number | null>(null); 
  isLoading = signal(false);
  showAddForm = signal(false);

  ngOnInit() {
    this.loadTeams();
    
    // טעינה ראשונית
    this.loadProjectsFromRoute();
    
    // מאזין לשינויים בניווט - כל פעם שחוזרים לדף הזה
    this.navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // בודק אם אנחנו בדף פרויקטים
      if (this.router.url.includes('/teams/') && this.router.url.includes('/projects')) {
        this.loadProjectsFromRoute();
      }
    });
    
    // מאזין גם לשינויים ב-route params
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const idFromUrl = params.get('id');
      if (idFromUrl) {
        const newTeamId = Number(idFromUrl);
        // רק אם ה-teamId השתנה - טוען מחדש
        if (this.teamId() !== newTeamId) {
          this.teamId.set(newTeamId);
          this.loadProjects();
        }
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    this.navigationSubscription?.unsubscribe();
  }

  loadProjectsFromRoute() {
    const idFromUrl = this.route.snapshot.paramMap.get('id');
    if (idFromUrl) {
      this.teamId.set(Number(idFromUrl));
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

    // תמיד מראה loading כשטוען פרויקטים
    this.isLoading.set(true);
    // מנקה את הפרויקטים הישנים
    this.projects.set([]);

    this.projectsService.getProjectsByTeam(id).subscribe({
      next: (data) => {
        const filteredData = data.filter((p: Project) => p.team_id === id);
        this.projects.set(filteredData);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
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
