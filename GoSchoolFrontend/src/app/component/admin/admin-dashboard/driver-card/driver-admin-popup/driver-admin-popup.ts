import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransportApplicationDTO } from '../../../../../dto/transportApplicationDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-admin-popup',
  imports: [CommonModule],
  templateUrl: './driver-admin-popup.html',
  styleUrl: './driver-admin-popup.css'
})
export class DriverAdminPopup {

  @Input() application!: TransportApplicationDTO | null;
  @Output() close = new EventEmitter<void>();

  capitalizeWords(value?: string | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
}
