import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DriverDTO } from '../../../../dto/driverDTO';
import { ParentDTO } from '../../../../dto/parentDTO';
import { CommonModule } from '@angular/common';
import { ParentCard } from '../parent-card/parent-card';
import { DriverCard } from '../driver-card/driver-card';

@Component({
  selector: 'app-admin-left-panel',
  imports: [CommonModule, ParentCard, DriverCard],
  templateUrl: './admin-left-panel.html',
  styleUrl: './admin-left-panel.css'
})
export class AdminLeftPanel {

  @Input() drivers: DriverDTO[] = [];
  @Input() parents: ParentDTO[] = [];
  @Input() activeTab!: 'drivers' | 'parents';
  @Input() currentPage = 1;
  @Input() pageSize = 5;

  @Output() driverSelect = new EventEmitter<DriverDTO>();
  @Output() parentSelect = new EventEmitter<ParentDTO>();
  @Output() pageChange = new EventEmitter<number>();

  get paginatedDrivers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.drivers.slice(start, start + this.pageSize);
  }

  get paginatedParents() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.parents.slice(start, start + this.pageSize);
  }

  totalPages(list: any[]) {
    return Math.ceil(list.length / this.pageSize);
  }
}
