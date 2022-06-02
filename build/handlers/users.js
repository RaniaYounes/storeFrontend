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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUserStore = new users_1.UserStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield newUserStore.index();
        res.json(users);
    }
    catch (error) {
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield newUserStore.show(req.body.id);
        res.json(user);
    }
    catch (error) {
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        const created = yield newUserStore.create(user);
        //let token = jwt.sign(
        //{ user: created },
        //process.env.TOKEN_SECRET as string
        //) as string;
        //res.json(token);
        res.json(created);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield newUserStore.delete(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        res.json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        const updated = yield newUserStore.update(req.body.id, user);
        res.json(updated);
    }
    catch (error) {
        res.json(error);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const password = req.body.password;
        if (id === undefined || password === undefined) {
            res.status(400);
            res.send("ID or Password are missing");
            return false;
        }
        const user = yield newUserStore.authenticate(id, password);
        let token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
        if (user === null) {
            res.status(401);
            res.send(`Wrong password for user with id ${id}.`);
            return false;
        }
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const userRoutes = (app) => {
    app.get("/users", index);
    app.post("/users", create);
    app.get("/users/:id", show);
    app.delete("/users", destroy);
    app.put("/users", update);
    app.post("/users/authenticate/:id", authenticate);
};
exports.default = userRoutes;
