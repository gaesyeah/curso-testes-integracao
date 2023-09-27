import supertest from "supertest";
import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {

  it("should create a user", async () => {
    const { status } = await api.post('/users').send({
      email: 'teste1@gmail.com',
      password: 'senhaDoTeste1'
    });
    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await prisma.user.create({
      data: {
        email: 'teste1@gmail.com',
        password: 'senhaDoTeste1'
      }
    });
    const { status } = await api.post('/users').send({
      email: 'teste1@gmail.com',
      password: 'senhaDoTeste1'
    });
    expect(status).toBe(409);
  });

});

describe("GET /users tests", () => {

  it("should return a single user", async () => {
    const { id, email, password } = await prisma.user.create({
      data: {
        email: 'teste1@gmail.com',
        password: 'senhaDoTeste1'
      }
    });
    const { status, body } = await api.get(`/users/${id}`);
    expect(status).toBe(200);
    expect(body).toEqual({
      id,
      email,
      password
    });
  });

  it("should return 404 when can't find a user by id", async () => {
    const { id } = await prisma.user.create({
      data: {
        email: 'teste1@gmail.com',
        password: 'senhaDoTeste1'
      }
    });
    await prisma.user.delete({
      where: { id }
    });
    const { status } = await api.get(`/users/${id}`);
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    await prisma.user.create({
      data: {
        email: 'teste1@gmail.com',
        password: 'senhaDoTeste1'
      }
    })
    await prisma.user.create({
      data: {
        email: 'teste2@gmail.com',
        password: 'senhaDoTeste2'
      }
    });
    const { body } = await api.get('/users');
    expect(body).toHaveLength(2);
    //FARIA MAIS SENTIDO DEIXAR O ARRAY DE OBJETOS FIXO JA QUE SEI EXATAMENTE COMO ELE SERÁ, MAS QUIS FAZER ASSIM PRA TREINAR A SINTAXE
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String)
        })
    ]));
  });

})