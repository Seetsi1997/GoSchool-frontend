import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Users } from '../../../../model/Users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-topbar',
  imports: [CommonModule],
  templateUrl: './admin-topbar.html',
  styleUrls: ['./admin-topbar.css']
})
export class AdminTopbar {
  @Input() admin!: Users;
  @Input() isProfileOpen = false;

  @Output() toggleProfile = new EventEmitter<void>();
}
