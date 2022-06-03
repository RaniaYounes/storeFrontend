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
const newProductStore = new product_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield newProductStore.index();
        res.json(products);
    }
    catch (error) {
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const created = yield newProductStore.create(product);
        res.json(created);
    }
    catch (error) {
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield newProductStore.show(req.params.id);
        res.json(product);
    }
    catch (error) {
        res.json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield newProductStore.delete(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        res.json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const updated = yield newProductStore.update(req.body.id, product);
        res.json(updated);
    }
    catch (error) {
        res.json(error);
    }
});
const productRoutes = (app) => {
    app.get("/products", index);
    app.post("/products", create);
    app.get("/products/:id", show);
    app.delete("/products", destroy);
    app.put("/products", update);
};
exports.default = productRoutes;
