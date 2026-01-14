import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DriverDTO } from '../../../../dto/driverDTO';
import { ParentDTO } from '../../../../dto/parentDTO';
import { Users } from '../../../../model/Users';
import { CommonModule } from '@angular/common';
import { ParentChildren } from '../parent-card/parent-children/parent-children';
import { AdminLeftPanel } from '../admin-left-panel/admin-left-panel';
import { AdminTopbar } from '../admin-topbar/admin-topbar';
import { DriverApplication } from '../driver-card/driver-application/driver-application';

@Component({
  selector: 'app-admin-home-view',
  imports: [CommonModule, ParentChildren, AdminLeftPanel, AdminTopbar, DriverApplication],
  templateUrl: './admin-home-view.html',
  styleUrl: './admin-home-view.css'
})
export class AdminHomeView {
   
  @Input() admin!: Users;
  @Input() drivers: DriverDTO[] = [];
  @Input() parents: ParentDTO[] = [];
  @Input() activeTab!: 'drivers' | 'parents';
  @Input() currentPage = 1;
  @Input() pageSize = 5;
  @Input() isProfileOpen = false;
  @Input() selectedDriver!: DriverDTO | null;
  @Input() selectedParent!: ParentDTO | null;

  @Output() setTab = new EventEmitter<'drivers' | 'parents'>();
  @Output() toggleProfile = new EventEmitter<void>();
  @Output() driverSelect = new EventEmitter<DriverDTO>();
  @Output() parentSelect = new EventEmitter<ParentDTO>();
  @Output() pageChange = new EventEmitter<number>();
}
