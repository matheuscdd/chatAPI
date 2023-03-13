import "dotenv/config";
import "reflect-metadata";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

function dataSourceConfig(): DataSourceOptions {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationsPath: string = path.join(__dirname, "./migrations/**.{ts,js}");
    const dblUrl: string | undefined = process.env.DATABASE_URL;

    if (!dblUrl) throw new Error("Env var DATABASE_URL does not exist");

    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if (nodeEnv === "test") return {
        type: "sqlite",
        database: ":memory:",
        synchronize: true, 
        entities: [entitiesPath]
    }

    return {
        type: "postgres",
        url: dblUrl,
        synchronize: false,
        logging: false,
        entities: [entitiesPath],
        migrations: [migrationsPath]
     }

}

export const AppDataSource: DataSource = new DataSource(dataSourceConfig());