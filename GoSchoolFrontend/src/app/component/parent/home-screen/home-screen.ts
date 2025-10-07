import { Component } from '@angular/core';
import { ParentDashboard } from "../parent-dashboard/parent-dashboard";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.css'
})
export class HomeScreen {

}
