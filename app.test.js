const supertest = require("supertest");
const createApp = require("./app");
const validatePassword = require("./validation/validatePassword");
const validateUsername = require("./validation/validateUsername");
const app = createApp(
  validateUsername,
  validatePassword
);

describe("Inputs for POST /users", () => {
  it("should return 200 & Valid User given correct username and password", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: "Username",
        password: "Password123",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Valid User",
    });
  });
  it("should return 200 & Invalid User given correct username and invalid password", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: "Username",
        password: "password123",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      error: "Invalid User",
    });
  });
  it("should return 200 & Invalid User given correct password and invalid username", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: "user",
        password: "Password123",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      error: "Invalid User",
    });
  });
  it("should return 200 & Invalid User given invalid username and invalid password", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: "user",
        password: "password123",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      error: "Invalid User",
    });
  });
  it("should return 200 & Invalid User given no username and no password", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: "",
        password: "",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      error: "Invalid User",
    });
  });
  it("should return 500 with no specific body given null username and null password", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: null,
        password: null,
      });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({});
  });
});

describe("Content-Type for POST /users", () => {
  it("should return 200 & Content-Type: application/json given correct inputs", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: "Username",
        password: "Password123",
      });
    expect(response.status).toBe(200);
    expect(
      response.headers["content-type"]
    ).toEqual(
      expect.stringContaining("application/json")
    );
  });
  it("should return 200 & Content-Type: application/json given incorrect inputs", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: "user",
        password: "pw",
      });
    expect(response.status).toBe(200);
    expect(
      response.headers["content-type"]
    ).toEqual(
      expect.stringContaining("application/json")
    );
  });
  it("should return 500 & no body &  Content-Type: text/html; charset=utf-8  given null inputs", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        username: null,
        password: null,
      });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({});
    expect(
      response.headers["content-type"]
    ).toEqual(
      expect.stringContaining(
        "text/html; charset=utf-8"
      )
    );
  });
});
