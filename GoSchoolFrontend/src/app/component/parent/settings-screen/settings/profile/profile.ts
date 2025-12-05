import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ParentDTO } from '../../../../../dto/parentDTO';
import { Parents } from '../../../../../service/serviceParent/parents';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [Parents],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit {
  parent: ParentDTO = {} as ParentDTO;
  originalParent: ParentDTO = {} as ParentDTO; 
  isLoading = true;
  isEditing = false;

  // Popup properties
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupType: 'success' | 'error' | 'info' = 'info';

  constructor(private router: Router, private parentService: Parents) { }

  ngOnInit() {
    this.loadParentData();
  }

  loadParentData() {
    this.isLoading = true;
    this.parentService.getCurrentParent().subscribe({
      next: (data) => {
        data.firstName = this.capitalizeRole(data.firstName ?? '');
        data.surname = this.capitalizeRole(data.surname ?? '');


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
    if (!this.originalParent || !this.parent) return false;

    return (
      this.parent.firstName !== this.originalParent.firstName ||
      this.parent.email !== this.originalParent.email ||
      this.parent.surname !== this.originalParent.surname ||
      this.parent.contact !== this.originalParent.contact ||
      this.parent.address !== this.originalParent.address ||
      this.parent.postalCode !== this.originalParent.postalCode ||
      this.parent.province !== this.originalParent.province ||
      this.parent.city !== this.originalParent.city
    );
  }

  saveChanges() {
    if (!this.hasChanges()) {
      this.showPopupMessage('No Changes', 'No changes were made to your profile.', 'info');
      return;
    }

    this.parentService.updateCurrentParent(this.parent).subscribe({
      next: (updatedParent) => {
        this.parent = updatedParent;
        this.originalParent = JSON.parse(JSON.stringify(updatedParent));
        this.isEditing = false;
        this.showPopupMessage('Success', 'Profile updated successfully.', 'success');
      },
      error: (error) => {
        console.error('Error updating parent:', error);
        this.showPopupMessage('Error', 'Error updating profile. Please try again.', 'error');
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
    this.router.navigate(['/parent-dashboard/settings']);
  }

  capitalizeRole(role: string | undefined | null): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }
}
