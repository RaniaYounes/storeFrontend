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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not get users Error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users WHERE id=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not show user with id: ${id}. Error: ${error}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *";
                const conn = yield database_1.default.connect();
                const hashedPassword = yield bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                const result = yield conn.query(sql, [
                    u.name,
                    u.email,
                    hashedPassword
                ]);
                const row = result.rows[0];
                conn.release();
                return row;
            }
            catch (error) {
                throw new Error(`Could not create a new user. Error: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const deletedUser = result.rows[0];
                conn.release();
                return deletedUser;
            }
            catch (error) {
                throw new Error(`Could not delete user ${id}. Error: ${error}`);
            }
        });
    }
    update(id, u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE users SET name = $1 , email = $2, password = $3 WHERE id = ${id} RETURNING *`;
                const connection = yield database_1.default.connect();
                const hashedPassword = yield bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                const result = yield connection.query(sql, [
                    u.name,
                    u.email,
                    hashedPassword,
                ]);
                const row = result.rows[0];
                console.log(result);
                console.log(result.rows);
                connection.release();
                return row;
            }
            catch (error) {
                throw new Error(`Could not update user. Error: ${error}`);
            }
        });
    }
    authenticate(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";
            const result = yield conn.query(sql, [id]);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(user);
                if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    console.log("comparison Succeful");
                    return user;
                }
            }
            console.log("password comparison failed");
            return null;
        });
    }
}
exports.UserStore = UserStore;
