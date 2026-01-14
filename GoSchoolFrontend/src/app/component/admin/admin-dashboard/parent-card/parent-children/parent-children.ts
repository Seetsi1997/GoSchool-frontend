import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ParentDTO } from '../../../../../dto/parentDTO';
import { CommonModule } from '@angular/common';
import { Parents } from '../../../../../service/serviceParent/parents';
import { Auth } from '../../../../../service/serviceAuth/auth';
import { StudentDTO } from '../../../../../dto/studentDTO';

@Component({
  selector: 'app-parent-children',
  imports: [CommonModule],
    providers: [Auth, Parents],
  templateUrl: './parent-children.html',
  styleUrls: ['./parent-children.css']
})
export class ParentChildren  implements OnChanges {

 @Input() parent!: ParentDTO | null;

  isLoadingChildren = false;
  children: StudentDTO[] = [];

  constructor(private parentService: Parents) {}

  ngOnChanges() {
    if (this.parent?.parentUUID) {
      this.loadChildren(this.parent.parentUUID);
    }
  }

  loadChildren(parentId: string) {
    this.isLoadingChildren = true;
    this.parentService.getChildrenByParent(parentId).subscribe({
      next: (children) => {
        this.children = children;
        this.isLoadingChildren = false;
      },
      error: () => {
        this.children = [];
        this.isLoadingChildren = false;
      }
    });
  }

  capitalizeWords(value?: string | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
}
