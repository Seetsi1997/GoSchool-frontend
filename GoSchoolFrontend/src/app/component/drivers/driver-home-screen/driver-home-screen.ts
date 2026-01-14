import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DriverDTO } from '../../../dto/driverDTO';
import { StudentDTO } from '../../../dto/studentDTO';
import { Driver } from '../../../service/serviceDriver/driver';

@Component({
  selector: 'app-driver-home-screen',
  standalone: true,
  imports: [CommonModule],
  providers: [Driver],
  templateUrl: './driver-home-screen.html',
  styleUrls: ['./driver-home-screen.css'],
})
export class DriverHomeScreen implements OnInit {
  students: StudentDTO[] = [];
  slides: StudentDTO[][] = [];
  driver!: DriverDTO;
  currentSlideIndex = 0;
  isLoading = true;
  itemsPerSlide = 3;

  constructor(private driverService: Driver) {}

  ngOnInit(): void {
    this.updateItemsPerSlide();
    window.addEventListener('resize', () => this.updateItemsPerSlide());
    this.loadCurrentDriver();
  }

  private loadCurrentDriver() {
    this.driverService.getCurrentDriver().subscribe({
      next: (driver) => {
        this.driver = driver;
        this.loadStudents();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading driver', err);
        this.isLoading = false;
      },
    });
  }

  private loadStudents() {
    if (!this.driver?.driverUUID) {
      console.error('Driver ID is missing');
      return;
    }

    this.driverService.getStudentsByDriverProvince(this.driver.driverLocation.province).subscribe({
      next: (students) => {
        this.students = students;
        this.createSlides();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching students', err);
        this.isLoading = false;
      },
    });
  }

  private createSlides(): void {
    this.slides = [];

    for (let i = 0; i < this.students.length; i += this.itemsPerSlide) {
      this.slides.push(this.students.slice(i, i + this.itemsPerSlide));
    }

    // Safety reset
    if (this.currentSlideIndex >= this.slides.length) {
      this.currentSlideIndex = 0;
    }
  }

  private updateItemsPerSlide(): void {
    const width = window.innerWidth;

    if (width <= 480) {
      this.itemsPerSlide = 1;
    } else if (width <= 1100) {
      this.itemsPerSlide = 1;
    } else {
      this.itemsPerSlide = 3;
    }

    if (this.students.length) {
      this.createSlides();
    }
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
  }

  getCurrentSlide(): StudentDTO[] {
    return this.slides[this.currentSlideIndex] || [];
  }

  capitalizeWords(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
