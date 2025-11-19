import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { SvgService } from '../../../../../service/SvgService/svg-service';

@Component({
  selector: 'app-privacy',
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css'
})
export class Privacy {
    privacyItems: any[] = [];
   
    constructor(
      private router: Router,
      private svgService: SvgService,
      private sanitizer: DomSanitizer
    ) {}
  
    ngOnInit() {
      this.loadMenuAndLogoutItems();
    }
  
    private loadMenuAndLogoutItems() {
      const menuIcons = ['mail','call','location'];
  
      this.svgService.preloadSvgs(menuIcons).subscribe(svgs => {
      
        this.privacyItems = [
          { id: 'mail', text: 'Email', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[0]) },
          { id: 'call', text: 'Call', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[1]) },
          { id: 'location', text: 'Location', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[2]) },
        ];
      });
    }
  
    goBack() {
      this.router.navigate(['/parent-dashboard/settings']);
    }
}