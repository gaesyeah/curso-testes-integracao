import supertest from "supertest";
import app, { fibonacciSequence } from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });
  it("/fibonacci when elements is NaN", async () => {
    const { status } = await api.get('/fibonacci').query({ elements: NaN });
    expect(status).toBe(400);
  });
  it("/fibonacci when elements is < 1", async () => {
    const { status } = await api.get('/fibonacci').query({ elements: '0' });
    expect(status).toBe(400);
  });
  it("/fibonacci when query is valid", async () => {
    const elements = 5;
    const { body, status } = await api.get('/fibonacci').query({ elements });
    expect(status).toBe(200);
    expect(body).toEqual(fibonacciSequence(elements));
  });
})