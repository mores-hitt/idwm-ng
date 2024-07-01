import { Component, OnInit } from '@angular/core';
import { Receipt } from 'src/app/_interfaces/receipt';
import { UserService } from 'src/app/_services/user.service';

/**
 * Component that displays a list of receipts.
 */
@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styles: [],
})
export class ReceiptListComponent implements OnInit {
  receipts: Receipt[] = [];

  constructor(private userService: UserService) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * It calls the `getReceipts` method to fetch the receipts.
   */
  ngOnInit(): void {
    this.getReceipts();
  }

  /**
   * Fetches the receipts from the user service and assigns them to the `receipts` property.
   * If an error occurs, it logs the error message to the console.
   */
  getReceipts() {
    this.userService.getPurchases().subscribe({
      next: (receipts) => {
        this.receipts = receipts;
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }
}
