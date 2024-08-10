import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Lizz22-17Restrepo",
    database: "centralDB",
    entities: [User, Product],
    synchronize: false,
    logging: false,
})

export const connectDB = async () => {
    try{
        await AppDataSource.initialize()
        console.log('Data Source has been initialized!');
    } catch (error){
        console.log('Error during data source initilization: ', error)
        process.exit(1)
    }
}
