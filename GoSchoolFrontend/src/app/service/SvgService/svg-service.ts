import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  private svgCache = new Map<string, string>();

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  // Method to get SVG from assets
  getSvg(iconName: string): Observable<string> { 
    // Check cache first
    if (this.svgCache.has(iconName)) {
      return of(this.svgCache.get(iconName)!);
    }

    return this.http.get(`svg/${iconName}.svg`, { responseType: 'text' })
      .pipe(
        map(svgContent => {
          this.svgCache.set(iconName, svgContent);
          return svgContent;
        }),
        catchError(error => {
          console.error(`Failed to load SVG: ${iconName}`, error);
          // Return a simple fallback SVG
          return of('<svg width="24" height="24" viewBox="0 0 24 24"><text x="12" y="12" text-anchor="middle" dominant-baseline="middle">❌</text></svg>');
        })
      );
  }

  // Method to preload multiple SVGs
  preloadSvgs(iconNames: string[]): Observable<string[]> {
    const loadRequests = iconNames.map(name => this.getSvg(name));
    
    return forkJoin(loadRequests);
  }

  
}