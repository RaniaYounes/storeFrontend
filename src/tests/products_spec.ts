
import bcrypt from "bcrypt";
import { Product, ProductStore } from "../models/product";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const store = new ProductStore();
let testProduct : Product = {
  
  name: 'tv',
  price: 10
  
}
//Testing if product methods are defined
it("product index method defined", () => {
  expect(store.index).toBeDefined();
});

it("product show method defined", () => {
  expect(store.show).toBeDefined();
});

it("product create method defined", () => {
  expect(store.create).toBeDefined();
});

it("product update method defined", () => {
  expect(store.update).toBeDefined();
});

it("product delete method defined", () => {
  expect(store.delete).toBeDefined();
});
//

//testing if product methods works as intended

describe('productsRepo', () => {
  it('Should create a new product', async () => {
      const product = await store.create(testProduct)
      product.name = product.name 
      expect(product.name ).toBeDefined
  })

  

  it('Should get all products', async () => {
      const product = await store.index()
      expect(product.length).toBeGreaterThan(0)
  })

  it("show product by product id method returned the correct product", async () => {
    const product = await store.show("1");
    expect(product.id).toEqual(1);
  });
  
  it("product delete method works as intented", async () => {
    const deletedProduct = await store.delete("2");
    expect(deletedProduct.id).toEqual(2);
  });
  
  



});