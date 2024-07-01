import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/_interfaces/product';
import { Receipt } from 'src/app/_interfaces/receipt';
import { AuthService } from 'src/app/_services/auth.service';
import { PurchaseService } from 'src/app/_services/purchase.service';

/**
 * Component for the buy modal.
 */
@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css'],
})
export class BuyModalComponent implements OnInit {
  /**
   * Event emitter for closing the buy modal.
   */
  @Output() closeBuyModal = new EventEmitter<void>();

  /**
   * Input property for the product to be bought.
   */
  @Input() product: Product = {} as Product;

  /**
   * Form group for the buy form.
   */
  buyForm: FormGroup = new FormGroup({});

  /**
   * Receipt object for storing the purchase receipt.
   */
  receipt: Receipt = {} as Receipt;

  /**
   * Error message string.
   */
  errorMessage: string = '';

  /**
   * Flag indicating whether the purchase was successful.
   */
  bought: boolean = false;

  /**
   * Constructor for the BuyModalComponent.
   * @param fb - FormBuilder for creating the buy form.
   * @param purchaseService - PurchaseService for making the purchase.
   * @param router - Router for navigating to different pages.
   */
  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook called after the component has been initialized.
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes the buy form with the necessary form controls and validators.
   */
  initializeForm(): void {
    this.buyForm = this.fb.group({
      Quantity: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.product.stock),
        ],
      ],
    });
  }

  /**
   * Handles the form submission when the user clicks the submit button.
   * Validates the form inputs and makes the purchase if the form is valid.
   */
  onSubmit(): void {
    if (this.buyForm.invalid) {
      if (this.buyForm.value.Quantity < 1) {
        this.errorMessage = 'La cantidad debe ser mayor a 0';
        console.log('cantidad menor a 1');
        return;
      }
      this.errorMessage = 'Formulario invalido';
      console.log('formulario invalido');
      return;
    }

    try {
      const auth = localStorage.getItem('auth');
      console.log(auth);
      if (!auth) {
        console.log('no hay auth');
        this.errorMessage = 'No hay usuario logueado';
        return;
      }
      const authJson = JSON.parse(auth);
      const UserId = authJson.user.id;
      const ProductId = this.product.id;
      const Quantity = this.buyForm.value.Quantity;

      this.errorMessage = '';

      this.purchaseService.purchase(Quantity, ProductId, UserId).subscribe({
        next: (receipt) => {
          console.log('compra exitosa');
          this.receipt = receipt;
          this.bought = true;
        },
        error: (error) => {
          console.log('error en la compra');
          this.errorMessage = 'Error en la compra';
        },
      });

      return;
    } catch (error) {
      console.log('error invalido');
      console.log(error);
      return;
    }
  }

  /**
   * Emits the closeBuyModal event to close the buy modal.
   */
  closeModal(): void {
    this.closeBuyModal.emit();
  }

  /**
   * Closes the receipt modal and refreshes the page by navigating to the same page.
   */
  closeReceiptModal(): void {
    this.bought = false;

    //refrescar la pagina, navegando hacia la misma pagina
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
