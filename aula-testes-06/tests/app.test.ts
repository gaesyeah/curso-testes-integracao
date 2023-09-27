import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should respond with status 200 and a body with an specific object", async () => {
    const { status, body } = await api.get('/event');
    expect(status).toBe(200);
    expect(body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      image: expect.any(String),
      date: expect.any(String)
    }))
  })
});