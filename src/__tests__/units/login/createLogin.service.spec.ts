import { Repository } from "typeorm";
import { User } from "../../../entities";
import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source";
import { createLoginServiceMock } from "../../mocks";
import services from "../../../services/session";
import { JwtPayload, decode } from "jsonwebtoken";
import { uuidRegex } from "../../../constraints/regex";
import { AppError } from "../../../errors";
import { EMAIL_OR_PWD_WRONG } from "../../../constraints/messages";

describe("Unit test: createUser functionalities", () => {
    let userRepo: Repository<User>;
    let connection: DataSource;

    beforeAll(async () => {
        // Atualizo a process.env
        process.env.SECRET_KEY = createLoginServiceMock.secretKey;

        await AppDataSource.initialize().then((res) => {
            connection = res;
            userRepo = res.getRepository(User);
        }).catch((error) => console.error(error))
    });

    beforeEach(async () => {
        await userRepo.remove(await userRepo.find());
    });

    afterAll(async () => await connection.destroy());

    it("Should be capable to create a token - Valid payload", async () => {
        const { base, valid } = createLoginServiceMock;
        const { id, email } = await userRepo.save({...base});

        const result = await services.login(valid);
        expect(result.token).toStrictEqual(expect.any(String));

        //O decode vai tratar o token
        const decodedToken = decode(result.token) as JwtPayload;
        expect(decodedToken).toStrictEqual(
            expect.objectContaining({
                sub: expect.stringMatching(uuidRegex),
                exp: expect.any(Number),
                iat: expect.any(Number),
                email
            })
        );

        // Pego o tempo em segundos de cada 
        const expiration = Number(new Date(decodedToken.exp!));
        const issuedAt = Number(new Date(decodedToken.iat!));
        
        // Calculo a diferença entre a expiração e o resultado
        const timestampDiff = Math.abs(expiration - issuedAt);
        
        //Converto o resultado para horas através de 3600, pois cada hora tem 3600 segundos
        const hoursDiff = timestampDiff / 3600;

        expect(hoursDiff).toEqual(24);
    });

    it("Should not be capable to create a token - Invalid email", async () => {
        const { base, invalidEmail } = createLoginServiceMock;
        await userRepo.save({...base});

        const result = services.login(invalidEmail);
        //Quem vai jogar o erro
        await expect(result).rejects.toThrowError(AppError);

        //Mensagem de erro
        await expect(result).rejects.toThrow(EMAIL_OR_PWD_WRONG);
    });

    it("Should not be capable to create a token - Invalid password", async () => {
        const { base, invalidPassword } = createLoginServiceMock;
        await userRepo.save({...base});

        const result = services.login(invalidPassword);
        await expect(result).rejects.toThrowError(AppError);
        await expect(result).rejects.toThrow(EMAIL_OR_PWD_WRONG);
    });
});