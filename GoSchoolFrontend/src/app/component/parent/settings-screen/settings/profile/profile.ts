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
  providers:[Parents],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile  implements OnInit{
  parent: ParentDTO = {} as ParentDTO;
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
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading parent data:', error);
        this.isLoading = false;
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  /*saveChanges() {
    this.parentService.updateCurrentParent(this.parent).subscribe({
      next: (updatedParent) => {
        this.parent = updatedParent;
        this.isEditing = false;
        // Show success message
      },
      error: (error) => {
        console.error('Error updating parent:', error);
        // Show error message
      }
    });
  }*/

  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

}
