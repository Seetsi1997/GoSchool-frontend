import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DriverDTO } from '../../../../dto/driverDTO';

@Component({
  selector: 'app-driver-card',
  imports: [CommonModule],
  templateUrl: './driver-card.html',
  styleUrl: './driver-card.css'
})
export class DriverCard {
 @Input() driver!: DriverDTO;

 
    capitalize(value:string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
