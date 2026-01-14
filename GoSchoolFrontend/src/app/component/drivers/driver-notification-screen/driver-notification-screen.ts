import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DriverNotificationDTO } from '../../../dto/DriverNotificationDTO';
import { StudentDTO } from '../../../dto/studentDTO';
import { Driver } from '../../../service/serviceDriver/driver';
import { ServiceDriverNotification } from '../../../service/serviceDriverNotification/service-driver-notification';
import { ApplicationStatus } from '../../constant/applicationStatus';
import { TransportApplicationDTO } from '../../../dto/transportApplicationDTO';

@Component({
  selector: 'app-driver-notification-screen',
  imports: [CommonModule],
  providers: [ServiceDriverNotification],
  templateUrl: './driver-notification-screen.html',
  styleUrls: ['./driver-notification-screen.css'],
})
export class DriverNotificationScreen implements OnInit {
  currentSlideIndex = 0;
  currentFilter: string = 'ALL';
  allNotifications: DriverNotificationDTO[] = [];
  filteredNotifications: DriverNotificationDTO[] = [];
  assignedStudents: StudentDTO[] = [];
  isLoading = true;

  constructor(
    private notificationService: ServiceDriverNotification,
    private driverService: Driver
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadDriverStudents();

    // Auto-slide every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  /** Apply filter to notifications */
  applyFilter(filter: string): void {
    console.log('Applying filter:', filter);
    console.log(
      'All notifications:',
      this.allNotifications.map((n) => ({
        id: n.id,
        actor: n.actor,
        status: n.applicationStatus,
        mappedStatus: this.getNotificationStatus(n),
      }))
    );

    this.currentFilter = filter;
    this.currentSlideIndex = 0;

    if (filter === 'ALL') {
      this.filteredNotifications = [...this.allNotifications];
    } else {
      this.filteredNotifications = this.allNotifications.filter((n) => {
        const status = this.getNotificationStatus(n);
        console.log(
          `Notification ${n.id}: ${n.applicationStatus} -> ${status}, matches ${filter}?`,
          status === filter
        );
        return status === filter;
      });
    }

    console.log('Filtered result:', this.filteredNotifications.length);
  }
  /** Get notification status from message or metadata */
  getNotificationStatus(notification: DriverNotificationDTO): string {
    const actor =
      typeof notification.actor === 'string'
        ? notification.actor.toUpperCase()
        : notification.actor;
    const status = notification.applicationStatus;
    const message = (notification.message || '').toLowerCase();

    // For driver notifications
    if (actor === 'DRIVER') {
      // First, try to determine by message (because the current backend data has wrong statuses)
      if (message.includes('approved')) {
        return 'APPROVED';
      }
      if (message.includes('rejected')) {
        return 'REJECTED';
      }
      // If message doesn't have keywords, then use the status (hopefully correct in the future)
      if (status === ApplicationStatus.APPROVED_BY_DRIVER) {
        return 'APPROVED';
      }
      if (status === ApplicationStatus.DECLINED) {
        return 'REJECTED';
      }
    }

    // For admin notifications
    if (actor === 'ADMIN') {
      // Current backend data: admin notification with message about approval by admin and status DECLINED.
      if (message.includes('approved by admin')) {
        return 'PENDING';
      }
      // If the backend is fixed, it should send PENDING for admin notifications.
      if (status === ApplicationStatus.PENDING) {
        return 'PENDING';
      }
    }

    // Default to pending for any other case
    return 'PENDING';
  }

  /** Get message for empty state */
  getNoNotificationsMessage(): string {
    switch (this.currentFilter) {
      case 'ALL':
        return 'You have no notifications at the moment.';
      case 'APPROVED':
        return 'No approved notifications found.';
      case 'REJECTED':
        return 'No rejected notifications found.';
      case 'PENDING':
        return 'No pending notifications to review.';
      default:
        return 'No notifications found.';
    }
  }

  /** Carousel controls */
  nextSlide(): void {
    if (this.filteredNotifications.length === 0) return;

    if (this.currentSlideIndex < this.filteredNotifications.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0;
    }
  }

  prevSlide(): void {
    if (this.filteredNotifications.length === 0) return;

    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.filteredNotifications.length - 1;
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.filteredNotifications.length) {
      this.currentSlideIndex = index;
    }
  }

  /** Load notifications from backend */
  loadNotifications(): void {
    this.isLoading = true;

    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        
        // Debug: Log all notifications
        console.log(
          'Raw notifications from backend:',
          data.map((n) => ({
            id: n.id,
            actor: n.actor,
            applicationStatus: n.applicationStatus,
            message: n.message,
            studentName: n.studentName,
            parentName: n.parentName,
            address: n.address,
            suburb: n.suburb,
            city: n.city,
            province: n.province,
            postalCode: n.postalCode,
            schoolName: n.schoolName,
          }))
        );

        

        // Filter notifications
        this.allNotifications = data.filter((n) => {
          const actor = typeof n.actor === 'string' ? n.actor.toUpperCase() : n.actor;
          // console.log(`Checking notification ${n.id}: actor=${actor}, status=${n.applicationStatus}`);

          // Always show driver notifications (approve/reject result)
          if (actor === 'DRIVER') return true;

          // Show admin notification ONLY if driver hasn't acted
          if (actor === 'ADMIN') {
            return !data.some((d) => d.actor === 'DRIVER' && d.applicationId === n.applicationId);
          }

          return false;
        });

        this.applyFilter(this.currentFilter);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
        this.isLoading = false;
      },
    });
  }

  /** Load driver students */
  loadDriverStudents(): void {
    this.driverService.getCurrentDriver().subscribe({
      next: (driver) => {
        this.assignedStudents = driver?.assignedStudents || [];
      },
      error: (err) => {
        console.error('Error loading students:', err);
        this.assignedStudents = [];
      },
    });
  }

  /** Approve notification */
  approve(notification: DriverNotificationDTO): void {
    console.log('Approving application:', notification.applicationId);

    this.notificationService.approveApplication(notification.applicationId).subscribe({
      next: (dto: TransportApplicationDTO) => {
        console.log('Approve response DTO:', dto);

        const index = this.allNotifications.findIndex((n) => n.id === notification.id);

        if (index !== -1) {
          const notif = this.allNotifications[index];

          // Update flattened fields
          notif.parentName = dto.parentName;
          notif.studentName = dto.studentName;

          // Keep status in sync
          notif.applicationStatus = dto.status;

          // Optional: update message if you want
          notif.message = 'You approved this application';
        }

        // Re-apply current filter
        this.applyFilter(this.currentFilter);

        // Reload students if approval assigns them
        this.loadDriverStudents();
      },
      error: (err) => {
        console.error('Error approving:', err);
      },
    });
  }

  /** Reject notification */
  reject(notification: DriverNotificationDTO): void {
    console.log('Rejecting application:', notification.applicationId);

    this.notificationService.rejectApplication(notification.applicationId).subscribe({
      next: (dto: TransportApplicationDTO) => {
        console.log('Reject response DTO:', dto);

        const index = this.allNotifications.findIndex((n) => n.id === notification.id);

        if (index !== -1) {
          const notif = this.allNotifications[index];

          // Update flattened fields
          notif.parentName = dto.parentName;
          notif.studentName = dto.studentName;

          // Update status
          notif.applicationStatus = dto.status;

          // Optional: update message
          notif.message = 'You rejected this application';
        }

        // Re-apply filter to move it into REJECTED
        this.applyFilter(this.currentFilter);
      },
      error: (err) => {
        console.error('Error rejecting:', err);
      },
    });
  }

  /** View details (for seen notifications) */
  viewDetails(notification: DriverNotificationDTO): void {
    // Implement view details logic
    console.log('Viewing details for:', notification);
    // You can navigate to a details page or show a modal
  }

  /** Get transform for carousel */
  getTransform(): string {
    if (this.filteredNotifications.length === 0) return 'translateX(0)';
    return `translateX(-${this.currentSlideIndex * 100}%)`;
  }

  
  capitalizeLetters(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
