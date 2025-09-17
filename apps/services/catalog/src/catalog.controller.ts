import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Product } from './catalog.types';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('catalog/products')
  listProducts(): Product[] {
    return this.catalogService.listProducts();
  }
}
