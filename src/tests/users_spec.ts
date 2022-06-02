import { User, UserStore } from "../models/users";
import bcrypt from "bcrypt";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const store = new UserStore();
let testUser: User = {
  
  name: 'test',
  email: 'test@test.com',
  password: 'test'
}
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
  it('Should create a new user', async () => {
      const user = await store.create(testUser)
      testUser.id = user.id as number
      expect(user.id).toEqual(testUser.id as number)
  })

  it('Should get user by Id', async () => {
      const user = await store.show(testUser.id as number)
      expect(user.id).toBe(testUser.id )
  })

  it('Should get all users', async () => {
      const users = await store.index()
      expect(users.length).toBeGreaterThan(0)
  })

  // test delete user
  it('Should delete user', async () => {
      const user = await store.delete(testUser.id as number);
      expect(user).toBeTruthy();
  })
})
