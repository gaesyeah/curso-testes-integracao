import app from "../src/index";
import supertest from "supertest";

const server = supertest(app);

describe("api", () => {
  it("/health", async () => {
    const result = await server.get('/health');
    expect(result.status).toEqual(200);
  });
});