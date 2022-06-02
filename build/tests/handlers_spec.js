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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const request = (0, supertest_1.default)(app_1.default);
//where we will store the token when we create a user
let token;
//testing user creation first in order to get a token
it("/user post request response is 200 and returns a token", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        name: "test",
        email: "test@test.com",
        password: "Password",
    };
    const response = yield request.post("/users").send(user);
    token = response.body;
    expect(response.status).toBe(200);
}));
//testing products routes
it("/products get request response is 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get("/products");
    expect(response.status).toBe(200);
}));
it("/products/:id get request response is 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get("/products/1");
    expect(response.status).toBe(200);
}));
it("/product post request with token response is 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: "Potatoes",
        price: 10,
    };
    const response = yield request
        .post("/products")
        .send(product)
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
//
//testing remaining user routes
it("/users get request with token response is 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request
        .get("/users")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
it("/users/:id get request with token response is 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request
        .get("/users/1")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
//
//testing order routes
it("/orders get request with token response is 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request
        .get("/orders")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
it("/orders/:id get request with token response is 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request
        .get("/orders/1")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
it("/orders/user/:id get request with token response is 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request
        .get("/orders/user/1")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
it("/orders post request with token response is 200 ", () => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        product_id: "1",
        quantity: 10,
        user_id: "1",
        status: "pending",
    };
    const response = yield request
        .post("/orders")
        .send(order)
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
//
