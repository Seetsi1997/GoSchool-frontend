import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DriverDTO } from '../../../../dto/driverDTO';
import { ParentDTO } from '../../../../dto/parentDTO';

@Component({
  selector: 'app-driver-card',
  imports: [CommonModule],
  templateUrl: './driver-card.html',
  styleUrl: './driver-card.css'
})
export class DriverCard {
  @Input() driver!: DriverDTO;
  @Output() select = new EventEmitter<DriverDTO>();

  onSelect() {
    this.select.emit(this.driver);
  }
  capitalize(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
