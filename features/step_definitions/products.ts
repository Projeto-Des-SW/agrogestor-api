import { DataTable, Given, When } from '@cucumber/cucumber';
import { E2EWorld } from 'features/support/env';
import { ProductsService } from 'src/product/products.service';

Given(
  'the following products exist:',
  async function (this: E2EWorld, products: DataTable) {
    const service = this.app.get(ProductsService);
    for (const product of products.hashes()) {
      await service.getByNameOrCreate(product.name);
    }
  },
);

When('the user requests all products', async function (this: E2EWorld) {
  this.response = await this.request
    .get('/products')
    .auth(this.accessToken, { type: 'bearer' });
});
