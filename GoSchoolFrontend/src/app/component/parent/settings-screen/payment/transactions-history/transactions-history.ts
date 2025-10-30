import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Parents } from '../../../../../service/serviceParent/parents';

@Component({
  selector: 'app-transactions-history',
 standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './transactions-history.html',
  styleUrl: './transactions-history.css'
})
export class TransactionsHistory {

  hasTransactions = false;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }
}
