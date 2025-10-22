import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ParentDTO } from '../../../../../../dto/parentDTO';
import { Parents } from '../../../../../../service/serviceParent/parents';
import { Province } from '../../../../../constant/province';

@Component({
  selector: 'app-relocation',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './relocation.html',
  styleUrl: './relocation.css',
})
export class ReLocation {
  parent: ParentDTO = {} as ParentDTO;
  originalParent: ParentDTO = {} as ParentDTO; // Store original data for comparison
  isLoading = true;
  isEditing = false;

  // Popup properties
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupType: 'success' | 'error' | 'info' = 'info';
  provinces = Object.values(Province);
  selectedProvince: Province | null = null;

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

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  hasChanges(): boolean {
    return (
       this.parent.suburb !== this.originalParent.suburb ||
      this.parent.city !== this.originalParent.city ||
      this.parent.address !== this.originalParent.address ||
      this.parent.postalCode !== this.originalParent.postalCode ||
      this.parent.province !== this.originalParent.province
    );
  }

  saveChanges() {
    // Check if there are any changes
    if (!this.hasChanges()) {
      this.showPopupMessage('No Changes', 'The location remained unchanged.', 'info');
      return;
    }

    this.parentService.updateCurrentParent(this.parent).subscribe({
      next: (updatedParent) => {
        this.parent = updatedParent;
        this.originalParent = { ...updatedParent };
        this.isEditing = false;
        this.showPopupMessage('Success', 'Location updated successfully.', 'success');
      },
      error: (error) => {
        console.error('Error updating parent:', error);
        this.showPopupMessage('Error', 'Error updating location. Please try again.', 'error');
      },
    });
  }

  showPopupMessage(title: string, message: string, type: 'success' | 'error' | 'info') {
    this.popupTitle = title;
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/parent-dashboard/settings']);
  }

  goBack() {
    this.router.navigate(['/parent-dashboard/settings/personal-details']);
  }
  capitalizeRole(role: string): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }
}
