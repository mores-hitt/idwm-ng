import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_interfaces/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styles: [],
})
export class ProductAddComponent implements OnInit {
  addForm: FormGroup = new FormGroup({});
  imagePath: string = 'assets/default-product.jpg';
  id: number = 0;
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    stock: 0,
    imgUrl: '',
    productType: { id: 0, type: '' },
  } as Product;
  typeOptions: { value: string; text: string }[] = [
    { value: '1', text: 'Tecnología' },
    { value: '2', text: 'Electrohogar' },
    { value: '3', text: 'Juguetería' },
    { value: '4', text: 'Ropa' },
    { value: '5', text: 'Muebles' },
    { value: '6', text: 'Comida' },
    { value: '7', text: 'Libros' },
  ];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      price: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100000000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      stock: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      image: [File, [Validators.required]],
      productTypeId: [null, [Validators.required]],
    });
  }

  addProduct() {
    const formData = new FormData();
    formData.append('name', this.addForm.get('name')?.value);
    formData.append('price', this.addForm.get('price')?.value);
    formData.append('stock', this.addForm.get('stock')?.value);
    formData.append('productTypeId', this.addForm.get('productTypeId')?.value);

    const image = this.addForm.get('image')?.value;
    if (image) {
      formData.append('image', image);
    }

    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/products');
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    if (file.size > 10485760) {
      alert('File is too big!');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePath = reader.result as string;
    };
    this.addForm.get('image')?.setValue(file);
  }
}
