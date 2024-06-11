import { Component, Input, ViewEncapsulation  } from '@angular/core';
import { Product } from '../../../core/models/object-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent {
  @Input() product : Product;
}
