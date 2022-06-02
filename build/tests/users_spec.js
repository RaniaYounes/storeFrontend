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
const users_1 = require("../models/users");
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const store = new users_1.UserStore();
let testUser = {
    name: 'test',
    email: 'test@test.com',
    password: 'test'
};
//Testing if user methods are defined
it("user index method defined", () => {
    expect(store.index).toBeDefined();
});
it("user show method defined", () => {
    expect(store.show).toBeDefined();
});
it("user create method defined", () => {
    expect(store.create).toBeDefined();
});
it("user update method defined", () => {
    expect(store.update).toBeDefined();
});
it("user delete method defined", () => {
    expect(store.delete).toBeDefined();
});
//
//testing if user methods works as intended
describe('UsersRepo', () => {
    it('Should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.create(testUser);
        testUser.id = user.id;
        expect(user.id).toEqual(testUser.id);
    }));
    it('Should get user by Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.show(testUser.id);
        expect(user.id).toBe(testUser.id);
    }));
    it('Should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield store.index();
        expect(users.length).toBeGreaterThan(0);
    }));
    // test delete user
    it('Should delete user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.delete(testUser.id);
        expect(user).toBeTruthy();
    }));
});
