import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_interfaces/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Represents the component for editing a product.
 */
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styles: [],
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  imagePath: string = 'assets/default-image.jpg';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getProduct();
      this.imagePath = this.product.imgUrl;
    });
    this.initializeForm();
  }

  /**
   * Initializes the form with default values and validators.
   */
  initializeForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      price: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100000000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      stock: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      image: [File, [Validators.required]],
      productTypeId: [null, [Validators.required]],
    });
  }

  /**
   * Retrieves the product from the server.
   */
  getProduct() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.product = response.find((x) => x.id == this.id) ?? this.product;
        console.log(this.product);
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
        console.log(result);
      },
    });
  }

  /**
   * Edits the product.
   */
  editProduct() {
    const formData = new FormData();
    formData.append('name', this.editForm.get('name')?.value);
    formData.append('price', this.editForm.get('price')?.value);
    formData.append('stock', this.editForm.get('stock')?.value);
    formData.append('productTypeId', this.editForm.get('productTypeId')?.value);

    const image = this.editForm.get('image')?.value;
    if (image) {
      formData.append('image', image);
    }

    this.productService.editProduct(this.id, formData).subscribe({
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

  /**
   * Handles the file selected event.
   * @param event The file selected event.
   */
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
    this.editForm.get('image')?.setValue(file);
  }
}
