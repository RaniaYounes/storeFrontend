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
const product_1 = require("../models/product");
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const store = new product_1.ProductStore();
let testProduct = {
    name: 'tv',
    price: 10
};
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
    it('Should create a new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield store.create(testProduct);
        product.name = product.name;
        expect(product.name).toBeDefined;
    }));
    it('Should get all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield store.index();
        expect(product.length).toBeGreaterThan(0);
    }));
    it("show product by product id method returned the correct product", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield store.show("1");
        expect(product.id).toEqual(1);
    }));
    it("product delete method works as intented", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedProduct = yield store.delete("2");
        expect(deletedProduct.id).toEqual(2);
    }));
});
