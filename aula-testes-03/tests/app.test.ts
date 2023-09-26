import calculator from "../src/calculator";

describe("teste de operações basicas", () => {
  it("soma", () => {
    expect(calculator.sum(2, 1)).toBe(3);
  });
  it("subtração", () => {
    expect(calculator.sub(2, 1)).toBe(1);
  });
  it("divisão", () => {
    expect(calculator.div(2, 1)).toBe(2);
  });
  it("multiplicação", () => {
    expect(calculator.mul(2, 1)).toBe(2);
  });
});