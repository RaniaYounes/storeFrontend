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
const newOrderStore = new order_1.OrderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield newOrderStore.index();
        res.json(orders);
    }
    catch (error) {
        res.json(error);
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const created = yield newOrderStore.createOrder(order);
        res.json(created);
    }
    catch (error) {
        res.json(error);
    }
});
const showByOrderID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield newOrderStore.showByOrderID(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.json(error);
    }
});
const showByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield newOrderStore.showByUserID(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.json(error);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield newOrderStore.deleteOrder(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        res.json(error);
    }
});
const createProductOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            product_id: req.body.product_id,
            order_id: req.body.order_id,
            quantity: req.body.quantity,
        };
        const created = yield newOrderStore.createProductOrder(order);
        res.json(created);
    }
    catch (error) {
        res.json(error);
    }
});
const deleteProductOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield newOrderStore.deleteProductOrder(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        res.json(error);
    }
});
const orderRoutes = (app) => {
    app.get("/orders", index);
    app.post("/orders", createOrder);
    app.get("/orders/:id", showByOrderID);
    app.get("/orders/user/:id", showByUserID);
    app.delete("/orders", deleteOrder);
    app.post("/orders/product", createProductOrder);
    app.delete("/orders/product", deleteProductOrder);
};
exports.default = orderRoutes;
