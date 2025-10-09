import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Parents } from '../../../../../service/serviceParent/parents';
import { ParentDTO } from '../../../../../dto/parentDTO';
import { FormsModule } from '@angular/forms';
import { ReLocation } from './relocation/relocation';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [Parents],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.css',
})
export class PersonalDetails implements OnInit {
  parent: ParentDTO = {} as ParentDTO;
  originalParent: ParentDTO = {} as ParentDTO;
  isLoading = true;
  isEditing = false;
  constructor(private router: Router, private parentService: Parents) {}

  ngOnInit() {
    this.loadParentData();
  }

  loadParentData() {
    this.isLoading = true;
    this.parentService.getCurrentParent().subscribe({
      next: (data) => {
        this.parent = data;
        this.originalParent = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading parent data:', error);
        this.isLoading = false;
      },
    });
  }

  capitalizeRole(role: string): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

  openReLocation() {
    this.router.navigate([
      '/parent-dashboard/settings/settings-personal-details/settings-relocate',
    ]);
  }
}
