import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DriverDTO } from '../../../../../dto/driverDTO';
import { TransportApplicationDTO } from '../../../../../dto/transportApplicationDTO';
import { TransportService } from '../../../../../service/serviceTransport/transport-service';
import { DriverAdminPopup } from '../driver-admin-popup/driver-admin-popup';

@Component({
  selector: 'app-driver-application',
  imports: [CommonModule, DriverAdminPopup],
  templateUrl: './driver-application.html',
  styleUrls: ['./driver-application.css']
})
export class DriverApplication {
 
  @Input() driver!: DriverDTO  | null;
  applications: TransportApplicationDTO[] = [];
  selectedApp?: TransportApplicationDTO | null;
  isLoadingApplications = false;

  constructor(private transportService: TransportService) {}

  ngOnChanges() {
    if (this.driver) {
      this.loadApplications();
    }
  }

  loadApplications() {
    this.transportService
      .getApplicationsByDriver(this.driver!.driverUUID)
      .subscribe(apps => this.applications = apps);
  }

  loadApplicationsForDriver() {
  this.transportService.getApplicationsByDriver(this.driver!.driverUUID).subscribe({
    next: (apps) => {
      this.applications = apps;
      this.isLoadingApplications = false;
    },
    error: () => {
      this.applications = [];
      this.isLoadingApplications = false;
    }
  });
}

  approve(appId: string) {
    this.transportService
      .approveApplication(this.driver!.driverUUID, appId)
      .subscribe(() => this.loadApplications());
  }

  openDetails(app: TransportApplicationDTO) {
  this.selectedApp = null;
  
  setTimeout(() => {
    this.selectedApp = app;
  });
}

closePopup() {
  this.selectedApp = null;
}

  capitalizeWords(value?: string | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
}
