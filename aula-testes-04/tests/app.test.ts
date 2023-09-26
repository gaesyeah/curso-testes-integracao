import app from "../src/index";
import supertest from "supertest";

const server = supertest(app);

describe("api", () => {
  it("/health", async () => {
    const { status } = await server.get('/health');
    expect(status).toBe(200);
  });
});