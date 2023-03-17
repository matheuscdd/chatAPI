/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  coverageProvider: "v8", //motor do node
  preset: "ts-jest", //Antes de fazer qualquer coisa, vai rodar o ts-jest
  testMatch: ["**/__tests__/(units|integrations)/**/*.[jt]s?(x)"] //Local para encontrar os testes
};
