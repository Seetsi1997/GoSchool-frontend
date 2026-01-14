import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverDTO } from '../../../dto/driverDTO';
import { DriverRouteDetailsDTO } from '../../../dto/driverRouteDetailsDTO';
import { StudentEntity } from '../../../model/student';
import { TransportApplicationEntity } from '../../../model/transportApplication';
import { Driver } from '../../../service/serviceDriver/driver';
import { Parents } from '../../../service/serviceParent/parents';
import { RouterService } from '../../../service/serviceRoute/router-service';
import { TransportService } from '../../../service/serviceTransport/transport-service';
import { ApplicationStatus } from '../../constant/applicationStatus';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  providers: [Driver, RouterService, TransportService, Parents],
  imports: [CommonModule, FormsModule],
  templateUrl: './home-screen.html',
  styleUrls: ['./home-screen.css'],
})
export class HomeScreen implements OnInit {
  drivers: any[] = [];
  selectedDriver: DriverDTO | null = null;
  currentIndex = 0;
  students: any[] = [];
  selectedStudent: any = null;
  applications: TransportApplicationEntity[] = [];
  selectedStudentUUID: string | null = null;

  applyForm = {
    numberOfKids: 0,
    message: '',
    selectedStudents: [] as StudentEntity[],
  };

  selectedRoute: any = null;

  // Popup properties
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupType: 'success' | 'error' | 'info' = 'info';

  constructor(
    private driverService: Driver,
    private routerService: RouterService,
    private transportService: TransportService,
    private parentService: Parents
  ) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverService.getAllDrivers().subscribe({
      next: (data: DriverDTO[]) => {
        this.drivers = data;
      },
      error: (err) => console.error('Failed to load drivers:', err),
    });
  }

  get totalStudents(): number {
    return this.selectedDriver?.assignedStudents?.length ?? 0;
  }

  openModal(driver: DriverDTO, index: number) {
    this.selectedDriver = driver;
    this.currentIndex = index;

    if (!driver.routeDetails || driver.routeDetails.length === 0) {
      this.routerService.getRoutes(driver.driverUUID).subscribe({
        next: (routes: DriverRouteDetailsDTO[]) => {
          this.selectedDriver!.routeDetails = routes || [];
        },
        error: (err) => {
          console.error('Failed to load routes:', err);
          this.selectedDriver!.routeDetails = [];
        },
      });
    }

    const modalToggle = document.getElementById('modal-toggle') as HTMLInputElement;
    if (modalToggle) modalToggle.checked = true;
  }

  openApplyModal(route: any) {
    this.selectedRoute = route;
    this.applyForm = { numberOfKids: 0, message: '', selectedStudents: [] };
    this.selectedStudent = null;

    const parentUUID = localStorage.getItem('parentUUID');
    if (!parentUUID) return;

    // Load students
    this.parentService.getStudentsByParent(parentUUID).subscribe({
      next: (students) => (this.students = students),
      error: () => (this.students = []),
    });

    // Load existing applications for THIS route
    this.transportService
      .getApplicationByParentAndRoute(parentUUID, this.selectedRoute.id)
      .subscribe({
        next: (app) => {
          this.applications = (app || []).filter(a => a.active === true);
          this.selectedStudent = null;
        },
        error: () => {
          this.applications = [];
          this.selectedStudent = null;
        },
      });

    (document.getElementById('apply-modal') as HTMLInputElement).checked = true;
  }

  // Show popup
  showCustomPopup(type: 'success' | 'error' | 'info', title: string, message: string) {
    this.popupType = type;
    this.popupTitle = title;
    this.popupMessage = message;
    this.showPopup = true;
  }

  // Close popup
  closePopup() {
    this.showPopup = false;
  }

  // Submit transport application
  submitApplication() {
    const parentUUID = localStorage.getItem('parentUUID');

    // --- Validation ---
    if (!parentUUID) {
      this.showCustomPopup('error', 'Not Logged In', 'Parent not logged in!');
      return;
    }

    if (!this.selectedRoute) {
      this.showCustomPopup('error', 'No Route Selected', 'Please select a route before applying.');
      return;
    }

    if (!this.applyForm.numberOfKids || this.applyForm.numberOfKids <= 0) {
      this.showCustomPopup('error', 'Invalid Input', 'Number of kids must be at least 1.');
      return;
    }

    if (!this.selectedStudentUUID) {
      this.showCustomPopup('error', 'No Student Selected', 'Please select a student.');
      return;
    }

    // --- Check existing application for this student ---
    this.transportService
      .getApplicationByParentAndRoute(parentUUID, this.selectedRoute.id)
      .subscribe({
        next: (apps: TransportApplicationEntity[]) => {
          const existingApp = apps?.find(
            (a) => a.student?.studentUUID === this.selectedStudentUUID
          );

          if (
            existingApp &&
            (existingApp.applicationStatus === ApplicationStatus.PENDING ||
              existingApp.applicationStatus === ApplicationStatus.APPROVED_BY_DRIVER ||
              existingApp.applicationStatus === ApplicationStatus.APPROVED_BY_ADMIN)
          ) {
            this.showCustomPopup(
              'error',
              'Already Applied',
              'You already applied for this student on this route.'
            );
            return;
          }

          // Only send if selectedStudentUUID is not null
          // Send application if all checks pass
          if (this.selectedStudentUUID) {
            this.sendApplication(
              parentUUID,
              [this.selectedStudentUUID].filter((id): id is string => id !== null)
            );
          }
        },
        error: () => {
          // On error, still try to send

          if (!this.selectedStudentUUID) return;
          this.sendApplication(parentUUID, [this.selectedStudentUUID]);
        },
      });
  }

  sendApplication(parentUUID: string, studentUUIDs: string[]) {
    const payload = {
      parentId: parentUUID,
      studentUUIDs,
      routeId: this.selectedRoute.id,
      numberOfKids: this.applyForm.numberOfKids,
      message: this.applyForm.message,
    };

    this.transportService.applyForTransport(payload).subscribe({
      next: (res: any) => {
        // Safety: check backend results
        const blocked = res?.results?.find((r: any) => r.status === 'blocked');

        if (blocked) {
          this.showCustomPopup(
            'error',
            'Already Applied',
            blocked.message || 'Application already exists.'
          );
          return;
        }

        this.showCustomPopup('success', 'Success', 'Application submitted successfully!');

        const applyModal = document.getElementById('apply-modal') as HTMLInputElement;
        if (applyModal) applyModal.checked = false;

        this.applyForm = { numberOfKids: 0, message: '', selectedStudents: [] };
        this.selectedStudentUUID = null;
      },

      error: (err) => {
        if (err.status === 409) {
          this.showCustomPopup(
            'error',
            'Already Applied',
            err.error?.message || 'Application already exists.'
          );
          return;
        }

        this.showCustomPopup('error', 'Error', 'Error submitting application.');
      },
    });
  }

canStudentApply(student: StudentEntity): boolean {
  const app = this.applications.find(
    (a) => a.student?.studentUUID === student.studentUUID
  );

  // No ACTIVE application → can apply
  if (!app) return true;

  return false;
}

  getStudentStatus(student: StudentEntity): string {
    const app = this.applications.find((a) => a.student?.studentUUID === student.studentUUID);

    if (!app) return '';
    if (app.applicationStatus === ApplicationStatus.PENDING) return ' (Pending)';
    if (app.applicationStatus === ApplicationStatus.APPROVED_BY_DRIVER) return ' (Approved)';
    if (app.applicationStatus === ApplicationStatus.DECLINED) return ' (Declined)';
    return '';
  }

  compareStudents(a: StudentEntity, b: StudentEntity): boolean {
    return a && b ? a.studentUUID === b.studentUUID : a === b;
  }

  onStudentChange(studentUUID: string | null) {
    this.selectedStudentUUID = studentUUID; 

    if (!studentUUID) return;

    const studentApp = this.applications?.find((a) => a.student.studentUUID === studentUUID);

   if (studentApp && studentApp.active) {
  this.showCustomPopup(
    'error',
    'Already Applied',
    'You already applied for this student on this route.'
  );
  this.selectedStudentUUID = null;
}

  }

  capitalizeLetters(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
