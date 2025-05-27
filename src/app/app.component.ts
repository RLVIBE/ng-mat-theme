import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    FormsModule, 
    MatButtonModule, MatButtonToggleModule, 
    MatCheckboxModule, MatSlideToggleModule, 
    MatTooltipModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-mat-theme';
  isDark = false;

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    let className = 'light';
    if (storedTheme === 'dark') {
      className = 'dark';
    }
    this.isDark = className === 'dark';
    document.documentElement.classList.add(className);
  }

  toggleTheme() {
    // "light"/"dark" in html supports tailwind css light/dark mode.
    const htmlClass = document.documentElement.classList;
    if (htmlClass.contains('light')) {
      htmlClass.remove('light');
      htmlClass.add('dark');
    } else {
      htmlClass.remove('dark');
      htmlClass.add('light');
    }
    this.isDark = !this.isDark;
    localStorage.setItem('theme', htmlClass.contains('dark') ? 'dark' : 'light');
  }

  readonly task = signal<Task>({
    name: 'Parent task (error-checkbox class)',
    completed: false,
    subtasks: [
      { name: 'Child task 1', completed: false },
      { name: 'Child task 2', completed: false },
      { name: 'Child task 3', completed: false },
    ],
  });

  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }
      return { ...task };
    });
  }

}

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
