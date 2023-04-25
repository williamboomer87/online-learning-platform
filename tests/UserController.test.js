const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

describe("UserController", () => {
  describe("create", () => {
    it("creates a new user", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "testpassword",
      };
      const response = await request(app).post("/users").send(userData);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        name: userData.name,
        email: userData.email,
      });
      const user = await User.findByPk(response.body.id);
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.checkPassword(userData.password)).toBe(true);
    });
  });

  describe("update", () => {
    it("updates an existing user", async () => {
      const user = await User.create({
        name: "Old User",
        email: "olduser@example.com",
        password: "oldpassword",
      });
      const updatedUserData = {
        name: "New User",
        email: "newuser@example.com",
        password: "newpassword",
      };
      const response = await request(app)
        .put(`/users/${user.id}`)
        .send(updatedUserData);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        name: updatedUserData.name,
        email: updatedUserData.email,
      });
      const updatedUser = await User.findByPk(user.id);
      expect(updatedUser.name).toBe(updatedUserData.name);
      expect(updatedUser.email).toBe(updatedUserData.email);
      expect(updatedUser.checkPassword(updatedUserData.password)).toBe(true);
    });
  });

  describe("delete", () => {
    it("deletes an existing user", async () => {
      const user = await User.create({
        name: "User to be deleted",
        email: "tobedeleted@example.com",
        password: "password",
      });
      const response = await request(app).delete(`/users/${user.id}`);
      expect(response.status).toBe(200);
      const deletedUser = await User.findByPk(user.id);
      expect(deletedUser).toBeNull();
    });
  });
});
