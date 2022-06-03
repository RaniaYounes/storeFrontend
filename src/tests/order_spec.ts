import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

let testOrder : Order = {
  
  user_id: "1",
    status: "pending"
  
}

//Testing if order methods are defined
it("order index method defined", () => {
  expect(store.index).toBeDefined();
});

it("order show by id method defined", () => {
  expect(store.showByOrderID).toBeDefined();
});

it("order show by user id method defined", () => {
  expect(store.showByUserID).toBeDefined();
});

it("order create method defined", () => {
  expect(store.createOrder).toBeDefined();
});

it("order delete method defined", () => {
  expect(store.deleteOrder).toBeDefined();
});

it("product order create method defined", () => {
  expect(store.createProductOrder).toBeDefined();
});

it("product order delete method defined", () => {
  expect(store.deleteProductOrder).toBeDefined();
});
//
describe('ordersRepo', () => {
  it('Should create a new product', async () => {
      const order = await store.createOrder(testOrder)
      order.status = order.status 
      expect(order.status ).toBeDefined
  })
})

//it('Should get product by id', async () => {
  //const order = await store.showByUserID(testOrder.user_id)
  //expect(order.status).toBe(testOrder.status)
//})
it('Should get all orders', async () => {
  const order = await store.index()
  expect(order.length).toBeGreaterThan(0)
})