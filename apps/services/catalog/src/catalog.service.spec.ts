import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  it('returns demo products', () => {
    const service = new CatalogService();
    expect(service.listProducts()).toHaveLength(3);
  });
});
