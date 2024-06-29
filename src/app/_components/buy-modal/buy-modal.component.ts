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
import {Receipt} from 'src/app/_interfaces/receipt';
import { AuthService } from 'src/app/_services/auth.service';
import { PurchaseService } from 'src/app/_services/purchase.service';


@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent {
  @Output() closeBuyModal = new EventEmitter<void>();
  @Input() product: Product = {} as Product;
  buyForm: FormGroup = new FormGroup({});
  receipt: Receipt = {} as Receipt;
  errorMessage: string = '';
  bought: boolean = false;


  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private router : Router,
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.buyForm = this.fb.group({
      Quantity: ['', [Validators.required, Validators.min(1), Validators.max(this.product.stock)]],
    });
  }

  onSubmit(): void {
    if(this.buyForm.invalid){
      if(this.buyForm.value.Quantity < 1){
        this.errorMessage = 'La cantidad debe ser mayor a 0'
        console.log('cantidad menor a 1')
        return
      }
      this.errorMessage = 'Formulario invalido'
      console.log('formulario invalido')
      return
    }

    try {

      const auth = localStorage.getItem('auth');
      console.log(auth);
      if (!auth) {
        console.log('no hay auth')
        this.errorMessage = 'No hay usuario logueado';
        return
      }
      const authJson = JSON.parse(auth);
      const UserId = authJson.user.id;
      const ProductId = this.product.id;
      const Quantity = this.buyForm.value.Quantity;

      this.errorMessage = '';

      this.purchaseService.purchase(Quantity, ProductId, UserId).subscribe({
        next: (receipt) => {
          console.log('compra exitosa')
          //hacer algo XDDDDD
          this.receipt = receipt;
          this.bought = true;
        },
        error: (error) => {
          console.log('error en la compra');
          this.errorMessage = 'Error en la compra';
        },
      });

      return
    } catch (error) {
      console.log('error invalido');
      console.log(error);
      return
    }
  }

  closeModal(): void {
    this.closeBuyModal.emit();
  }

  closeReceiptModal(): void {
    this.bought = false;

    //refrescar la pagina, navegando hacia la misma pagina
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
