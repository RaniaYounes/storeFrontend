"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
let testOrder = {
    user_id: "1",
    status: "pending"
};
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
    it('Should create a new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield store.createOrder(testOrder);
        order.status = order.status;
        expect(order.status).toBeDefined;
    }));
});
//it('Should get product by id', async () => {
//const order = await store.showByUserID(testOrder.user_id)
//expect(order.status).toBe(testOrder.status)
//})
it('Should get all orders', () => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.index();
    expect(order.length).toBeGreaterThan(0);
}));
