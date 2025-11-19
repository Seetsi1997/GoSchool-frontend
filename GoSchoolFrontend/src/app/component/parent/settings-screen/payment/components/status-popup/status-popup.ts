import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-status-popup',
  imports: [CommonModule],
  templateUrl: './status-popup.html',
  styleUrls: ['./status-popup.css']
})
export class StatusPopup {
  @Input() show = false;
  @Input() title = '';
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  
  @Output() closed = new EventEmitter<void>();

  onClose() {
    this.closed.emit();
  }
}
