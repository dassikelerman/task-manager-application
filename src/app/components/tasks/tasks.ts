import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TasksService } from '../../services/task.service';
import { ProjectsService } from '../../services/projects.service';
import { Task, Comment, Project, User, PriorityLabels } from '../../models/models';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  private route = inject(ActivatedRoute);
  private tasksService = inject(TasksService);
  private projectsService = inject(ProjectsService);

  tasks = signal<Task[]>([]);
  projects = signal<Project[]>([]);
  users = signal<User[]>([]);
  projectId = signal<number | null>(null);
  isLoading = signal(false);
  showForm = signal(false);

  currentComments = signal<Comment[]>([]); 
  activeTaskId = signal<number | null>(null);
  commentsCount = computed(() => this.currentComments().length);

  newTask = { title: '', description: '', priority: 'normal' as 'low' | 'normal' | 'high', dueDate: '' };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('projectId');
    if (id) {
      this.projectId.set(Number(id));
      this.loadData();
    }
  }

  // טוען את כל הדאטה שצריך - פרויקטים, משתמשים, משימות
  loadData() {
    const id = this.projectId();
    if (!id) return;
    
    this.isLoading.set(true);
    
    // טוען הכל ביחד
    forkJoin({
      projects: this.projectsService.getProjectsByTeam(1), // צריך את ה-teamId הנכון
      tasks: this.tasksService.getTasksByProject(id)
    }).subscribe({
      next: (data) => {
        this.projects.set(data.projects);
        this.tasks.set(data.tasks);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  addTask() {
    const pId = this.projectId();
    if (!pId || !this.newTask.title.trim()) return;

    const taskToSend: Partial<Task> = {
      projectId: pId, // לפי Postman
      title: this.newTask.title.trim(),
      description: this.newTask.description,
      status: 'todo',
      priority: this.newTask.priority,
      assigneeId: 1, // לפי Postman
      orderIndex: 0  // לפי Postman
    };

    if (this.newTask.dueDate) {
      taskToSend.dueDate = this.newTask.dueDate;
    }

    this.tasksService.createTask(taskToSend).subscribe({
      next: (res: Task) => {
        this.tasks.update(prev => [...prev, res]);
        // איפוס ידני
        this.newTask = { title: '', description: '', priority: 'normal', dueDate: '' };
        this.showForm.set(false);
      }
    });
  }

  changeStatus(taskId: number, newStatus: string) {
    const status = newStatus as 'todo' | 'in_progress' | 'done';
    this.tasksService.updateTask(taskId, { status }).subscribe({
      next: (updated: Task) => {
        this.tasks.update(all => all.map(t => t.id === taskId ? updated : t));
      }
    });
  }

  removeTask(taskId: number) {
    if (confirm('למחוק את המשימה?')) {
      this.tasksService.deleteTask(taskId).subscribe({
        next: () => this.tasks.update(all => all.filter(t => t.id !== taskId))
      });
    }
  }

  toggleComments(taskId: number) {
    if (this.activeTaskId() === taskId) {
      this.activeTaskId.set(null);
      this.currentComments.set([]); 
    } else {
      this.activeTaskId.set(taskId);
      this.tasksService.getComments(taskId).subscribe({
        next: (data: Comment[]) => this.currentComments.set(data),
        error: () => this.currentComments.set([])
      });
    }
  }

  addComment(taskId: number, text: string) {
    if (!text.trim()) return;
    this.tasksService.addComment(taskId, text).subscribe({
      next: (newComment: Comment) => {
        this.currentComments.update(prev => [...prev, newComment]);
      }
    });
  }

  // פונקציות להצגת שמות - הלוגיקה פה בקומפוננטה!
  getProjectName(): string {
    const id = this.projectId();
    if (!id) return '';
    const project = this.projects().find(p => p.id === id);
    return project?.name || `פרויקט #${id}`;
  }

  getAssigneeName(assigneeId: number): string {
    const user = this.users().find(u => u.id === assigneeId);
    return user?.name || `משתמש ${assigneeId}`;
  }

  getCommentUserName(comment: Comment): string {
    return comment.author_name || `משתמש ${comment.user_id}`;
  }

  // פונקציה להחזיר משימות לפי סטטוס
  getTasksByStatus(status: 'todo' | 'in_progress' | 'done'): Task[] {
    return this.tasks().filter(task => task.status === status);
  }

  // פונקציה להחזיר תווית עדיפות בעברית - תוקן ללא any
  getPriorityLabel(priority: string): string {
    const labels: PriorityLabels = {
      'low': 'נמוכה',
      'normal': 'רגילה',
      'high': 'גבוהה'
    };
    return labels[priority as keyof PriorityLabels] || priority;
  }
}
