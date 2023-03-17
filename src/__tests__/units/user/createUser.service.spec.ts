import { DataSource, QueryFailedError, Repository } from "typeorm";
import { User } from "../../../entities";
import { AppDataSource } from "../../../data-source";
import { createUserServiceMock } from "../../mocks";
import services from "../../../services/user";
import { getRounds } from "bcryptjs";
import { uuidRegex } from "../../../constraints/regex";


describe("Unit test: create UserService functionalities", () => { //Descrição do que o teste está fazendo
    let userRepo: Repository<User>;
    let connection: DataSource;

    //o beforeAll roda antes de todos os teste
    beforeAll(async () => { 
        //Só inicio a conexão com o banco de dados quando o teste começar
        await AppDataSource.initialize().then((res) => {
            connection = res;
            userRepo = res.getRepository(User);
        }).catch((error) => console.error(error))
    });

    //o beforeEach é o que eu executo antes de cada teste
    beforeEach(async () => {
        //Estou apagando todos os dados do banco de dados
        await userRepo.remove(await userRepo.find())
    });

    //o afterAll roda depois de todos os testes
    afterAll(async () => await connection.destroy());
    //Após a execução dos testes a conexão com o banco de dados será encerrada

    //Descrição de teste
    it("Should be capable to create a user - Valid payload", async () => {
        const { valid } = createUserServiceMock;
        const result = await services.create(valid);

        const expectedResult = {
            //Estou validando se é uuid válido
            id: expect.stringMatching(uuidRegex),
            name: "Thanatos Albertino",
            email: "thanatos@mail.com",
            birthDate: new Date(1991, 5 - 1, 11),
            description: null,
            status: "active",
            createdAt: expect.any(Date), 
            //Aqui digo que espero qualquer tipo de data
            updatedAt: expect.any(Date),
            deleteAt: null
        }   



        expect(result).toStrictEqual(expectedResult);
        // Quero que o resultado seja estritamente igual ao que foi pedido

        expect(result).not.toEqual(
            expect.objectContaining({ password: expect.anything() })
            //Quero que o resultado não seja um objeto que tenha a password
        );

        const userCreated: User | null = await userRepo.findOneBy({ id: result.id });
        expect(userCreated).not.toBeNull();
        expect(userCreated!.password).not.toStrictEqual(valid.password);
        expect(getRounds(userCreated!.password)).not.toBe(0);

    });

    it("Should not be capable to creta a user - Unique email", async () => {
        const { unique } = createUserServiceMock;
        await userRepo.save({...unique});     const result = services.create(unique);
        //Não posso ter um await aqui, pois isso iria estourar na aplicação inteira
        //Então, antes de chegar no erro final que trava tudo, ele para

        await expect(result).rejects.toThrowError(QueryFailedError);
        //Digo que espero receber um erro

        await expect(result).rejects.toThrow("unique".toUpperCase());
        //Em algum lugar da mensagem de erro é preciso existir a palavra "UNIQUE"

        await expect(result).rejects.toThrow("email");
        //Além disso é preciso ter a palavra email

        const countUsers = await userRepo.count()
        // Verificando se existe apenas um usuário cadastrado

        expect(countUsers).toBe(1)
    });
});