import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface ManagedFile {
  name: string;
  type: string;
  category: string;
  updated: string;
  size: string;
  color: string;
  initials: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly files: ManagedFile[] = [
    { name: 'Contratto affitto.pdf', type: 'PDF', category: 'Documenti', updated: 'Oggi, 10:42', size: '2.4 MB', color: 'rose', initials: 'PDF' },
    { name: 'Foto vacanze 2025', type: 'JPG', category: 'Immagini', updated: 'Ieri, 18:20', size: '8.1 MB', color: 'blue', initials: 'IMG' },
    { name: 'Budget familiare.xlsx', type: 'XLS', category: 'Lavoro', updated: '12 ott 2025', size: '1.2 MB', color: 'green', initials: 'XLS' },
    { name: 'Lista della spesa.docx', type: 'DOC', category: 'Personali', updated: '10 ott 2025', size: '340 KB', color: 'purple', initials: 'DOC' },
  ];

  protected activeSection = 'Tutti i file';
  protected searchTerm = '';
  protected readonly today = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(new Date()).toLocaleUpperCase('it');

  protected get filteredFiles(): ManagedFile[] {
    const query = this.searchTerm.trim().toLocaleLowerCase('it');
    return this.files.filter((file) => {
      const matchesSearch = !query || file.name.toLocaleLowerCase('it').includes(query);
      const matchesSection = this.activeSection === 'Tutti i file' || file.category === this.activeSection;
      return matchesSearch && matchesSection;
    });
  }
}
