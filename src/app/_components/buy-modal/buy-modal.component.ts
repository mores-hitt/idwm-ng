import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/_interfaces/product';


@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent {
  @Output() closeBuyModal = new EventEmitter<void>();
  @Input() product: Product = {} as Product;
  buyForm: FormGroup = new FormGroup({});
  errorMessage: string = '';


  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    console.log('Entro al fakin modal')
    this.initializeForm();
  }

  initializeForm(): void {
    this.buyForm = this.fb.group({
      Quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if(this.buyForm.invalid){
      this.errorMessage = 'Formulario invalido'
      console.log('formulario invalido pete')
      return
    }

    try {
      this.errorMessage = '';
      console.log('muy buenas a todos chavales');
      const data = this.buyForm.value;
      console.log(data);
      /*
      const newCreateMember : CreateMember = data;
      const response = this.memberservice.createMember(newCreateMember).subscribe({
      })
      */

      return
    } catch (error) {
      console.log('error invalido pete')
      return
    }
  }

  closeModal(): void {
    this.closeBuyModal.emit();
  }

}
