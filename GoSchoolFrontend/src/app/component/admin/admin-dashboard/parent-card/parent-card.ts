import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParentDTO } from '../../../../dto/parentDTO';

@Component({
  selector: 'app-parent-card',
  imports: [],
  templateUrl: './parent-card.html',
  styleUrl: './parent-card.css'
})
export class ParentCard {
   @Input() parent!: ParentDTO;
   @Output() select = new EventEmitter<ParentDTO>();

  onSelect() {
    this.select.emit(this.parent);
  }

    capitalize(value:string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
