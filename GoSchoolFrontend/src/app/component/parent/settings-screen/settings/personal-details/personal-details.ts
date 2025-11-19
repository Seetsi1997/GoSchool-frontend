import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ParentDTO } from '../../../../../dto/parentDTO';
import { Parents } from '../../../../../service/serviceParent/parents';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [Parents],
  templateUrl: './personal-details.html',
  styleUrls: ['./personal-details.css'],
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


capitalizeRole(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

  openReLocation() {
    this.router.navigate([
      '/parent-dashboard/settings/personal-details/relocate',
    ]);
  }
}
