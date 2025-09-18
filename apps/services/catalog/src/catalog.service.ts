import { Injectable } from '@nestjs/common';
import { Product } from './catalog.types';

const demoProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Panier de fruits bio',
    category: 'Grocery.Produce',
    price: 24.9
  },
  {
    id: 'prod-2',
    name: 'Nettoyage appartement 50m²',
    category: 'Services.Cleaning',
    price: 59
  },
  {
    id: 'prod-3',
    name: 'Smartphone Echo One',
    category: 'Electronics.Phone',
    price: 699
  }
];

@Injectable()
export class CatalogService {
  listProducts(): Product[] {
    return demoProducts;
  }
}
