import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgService } from '../../../../../service/SvgService/svg-service';

@Component({
  selector: 'app-parent-sidebar',
  imports: [CommonModule],
  templateUrl: './parent-sidebar.html',
  styleUrls: ['./parent-sidebar.css']
})
export class ParentSidebar {

  @Input() isOpen = false;
  @Input() activeItem: string = 'home';
  @Input() displayName: string = '';
  @Input() email: string = '';
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<string>();

  menuItems: any[] = [];
  logoutItems: any[] = [];
  profileItems: any[] = [];

  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadMenuAndLogoutItems();
  }

  private loadMenuAndLogoutItems() {
    const menuIcons = ['profile','home','add', 'settings', 'logout'];

    this.svgService.preloadSvgs(menuIcons).subscribe(svgs => {
       this.profileItems = [
      { id: 'profile', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[0]) },
    ];
      this.menuItems = [
        { id: 'home', text: 'Home', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[1]) },
        { id: 'add', text: 'Add', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[2]) },
        { id: 'settings', text: 'Settings', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[3]) },
      ];

      this.logoutItems = [
        { id: 'logout', text: 'Logout', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[4]) },
      ];
    });
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  onMenuItemClick(itemId: string) {
    this.menuItemClick.emit(itemId);
  }
}

