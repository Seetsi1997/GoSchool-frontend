import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { DriverDTO } from "../../../../dto/driverDTO";
import { ParentDTO } from "../../../../dto/parentDTO";
import { Driver } from "../../../../service/serviceDriver/driver";
import { Parents } from "../../../../service/serviceParent/parents";
import { Role } from "../../../constant/role";

@Component({
  selector: 'app-review-submit',
  imports: [CommonModule, RouterModule],
  templateUrl: './review-submit.html',
  styleUrls: ['./review-submit.css']
})
export class ReviewSubmit {
  @Input() form!: FormGroup; 
  @Output() previousStep = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>(); 

  loading = false;

  constructor(
    private router: Router,
    private driverService: Driver,
    private parentsService: Parents
  ) {}

  goPrevious() {
    this.previousStep.emit();
  }

  onSubmit() {
    // Mark all fields as touched
    Object.keys(this.form.controls).forEach(ctrl =>
      this.form.get(ctrl)?.markAsTouched()
    );

    if (!this.form.valid) {
      // Log invalid controls
      Object.keys(this.form.controls).forEach(ctrl => {
        const control = this.form.get(ctrl);
        if (control && control.invalid) {
          console.log(`${ctrl}:`, control.errors);
        }
      });
      return;
    }

    this.loading = true;

    const formData = this.form.value;
    let request$: Observable<any>;

    // Map values depending on role
    switch (formData.role) {
      case Role.DRIVER:
        const driverDTO: DriverDTO = {
          driverUUID: '', 
          driverName: formData.firstName,
          driverSurname: formData.surname,
          email: formData.email,
          contact: formData.contact,
          password: formData.password,
          driverLocation: {
            address: formData.address,
            suburb: formData.suburb,
            city: formData.city,
            postalCode: formData.postalCode,
            province: formData.province,
            locationUUID: '' 
          },
          totalNumberOfStudents: 0,
          assignedStudents: [],
          userId: '', 
          role: formData.role,
          routeDetails: []
        };
        request$ = this.driverService.register(driverDTO);
        break;

      case Role.PARENT:
        const parentDTO: ParentDTO = {
          parentUUID: '',
          firstName: formData.firstName,
          surname: formData.surname,
          email: formData.email,
          contact: formData.contact,
          password: formData.password,
          address: formData.address,
            suburb: formData.suburb,
            city: formData.city,
            postalCode: formData.postalCode,
            province: formData.province,
            userId: '',
            children: [],
           role: formData.role
        };
        request$ = this.parentsService.register(parentDTO);
        break;

      default:
        console.error('Unknown role:', formData.role);
        this.loading = false;
        return;
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: err => {
        console.error('Registration error', err);
        this.loading = false;
      }
    });
  }

  capitalizeRole(role: string): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }
}
