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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM product";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not show list of products. Error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM product WHERE id=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not show product. Error: ${error}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO product (name, price) VALUES($1, $2) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [product.name, product.price]);
                const createdProduct = result.rows[0];
                conn.release();
                return createdProduct;
            }
            catch (error) {
                throw new Error(`Could not create a new product. Error: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM product WHERE id=($1) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const deletedProduct = result.rows[0];
                conn.release();
                return deletedProduct;
            }
            catch (err) {
                throw new Error(`Could not delete product with id: ${id}. Error: ${err}`);
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE product SET name = $1 , price = $2 WHERE id = ${id} RETURNING *`;
                const connection = yield database_1.default.connect();
                const result = yield connection.query(sql, [product.name, product.price]);
                const updatedProduct = result.rows[0];
                connection.release();
                return updatedProduct;
            }
            catch (error) {
                throw new Error(`Could not update product. Error: ${error}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
