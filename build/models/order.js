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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not get list of orders. Error: ${error}`);
            }
        });
    }
    showByOrderID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE id=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not show order by id. Error: ${error}`);
            }
        });
    }
    showByUserID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE user_id=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not show order by user id. Error: ${error}`);
            }
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO orders (user_id,status) VALUES($1, $2) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [order.user_id, order.status]);
                const createdOrder = result.rows[0];
                conn.release();
                return createdOrder;
            }
            catch (error) {
                throw new Error(`Could not create a new order. Error: ${error}`);
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const deletedOrder = result.rows[0];
                conn.release();
                return deletedOrder;
            }
            catch (err) {
                throw new Error(`Could not delete order with id:${id}. Error: ${err}`);
            }
        });
    }
    createProductOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO order_product(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    order.quantity,
                    order.order_id,
                    order.product_id,
                ]);
                const createdOrder = result.rows[0];
                conn.release();
                return createdOrder;
            }
            catch (error) {
                throw new Error(`Could not create a new order. Error: ${error}`);
            }
        });
    }
    deleteProductOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM order_product WHERE id=($1) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const deletedOrder = result.rows[0];
                conn.release();
                return deletedOrder;
            }
            catch (err) {
                throw new Error(`Could not delete order with id:${id}. Error: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
