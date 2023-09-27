import prisma from "database";
import { UserInput } from "repository";

export async function createUser(userData: UserInput){
  const { email, password } = userData;
  return await prisma.user.create({
    data: {
      email,
      password
    }
  })
};

export async function createManyUser(userData: UserInput){
  const { email, password } = userData;
  return await prisma.user.createMany({
    data: [{
      ...userData
    }, {
      ...userData, email: "teste2@teste.com.br"
    }]
  });
};