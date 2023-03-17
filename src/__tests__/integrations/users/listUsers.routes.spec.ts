import { DataSource, Repository } from "typeorm";
import { User } from "../../../entities";
import { AppDataSource } from "../../../data-source";
import { createLoginServiceMock, errorsMock, tokensMock } from "../../mocks";
import request from "supertest";
import app from "../../../app";
import { uuidRegex } from "../../../constraints/regex";

describe("Integration test: GET - /listUsers functionalities", () => {
    let userRepo: Repository<User>;
    let connection: DataSource;
    const route: string = "/users";

    beforeAll(async () => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
            userRepo = res.getRepository(User);
        }).catch((error) => console.error(error));

        // Como ele quer listar, ele já cria primeiro
        await userRepo.save(createLoginServiceMock.base);
    });

    afterAll(async () => await connection.destroy());

    it("Success: Must be able to list all users", async () => {
        const auth = await request(app).post("/session").send(createLoginServiceMock.valid);
        // Esse request vem do SUPERTEST
        
        const response = await request(app)
            .get(route)
            .set("Authorization", `Bearer ${auth.body.token}`)
            .send();
        //Consigo colocar os headers aqui

        expect(response.status).toBe(200);
        // Consigo pegar o status code

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.not.objectContaining({
                    password: expect.any(String)
                })
            ])
        );
        // Consigo pegar o array de retorno
        
        //Por estar usando essa request do supertest, ela muda os dados
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.stringMatching(uuidRegex),
                    name: createLoginServiceMock.base.name,
                    email: createLoginServiceMock.base.email,
                    birthDate: new Date(1991, 5 - 1, 11).toISOString(),
                    description: null,
                    status: "active",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    deleteAt: null
                })
            ])
        );  
    });

    it("Error: must not be able list all users: Missing token", async () => {
        const response = await request(app)
            .get(route)
            .send();
        
        expect(response.status).toBe(errorsMock.missingToken.status);
        expect(response.body).toStrictEqual(errorsMock.missingToken.error);
    });

    it("Error: must not be able list all users: jwt malformed", async () => {
        const response = await request(app)
            .get(route)
            .set("Authorization", `Bearer ${tokensMock.jwtMalformed}`)
            .send();
        
        expect(response.status).toBe(errorsMock.jwtMalformed.status);
        expect(response.body).toStrictEqual(errorsMock.jwtMalformed.error);
    });

    it("Error: must not be able list all users: Invalid signature", async () => {
        const response = await request(app)
            .get(route)
            .set("Authorization", `Bearer ${tokensMock.invalidSignature}`)
            .send()

        expect(response.body).toHaveProperty("message");
        //Verifica se tem a propriedade

        expect(response.status).toBe(errorsMock.invalidSignature.status);
        expect(response.body).toStrictEqual(errorsMock.invalidSignature.error);
    });

});