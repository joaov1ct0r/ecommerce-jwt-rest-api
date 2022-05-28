import sequelize from 'sequelize';

let { Sequelize } = sequelize;

let dbConnection = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

try {
    await dbConnection.authenticate();

    console.log('Conexão estabelecida com DB!');
} catch (error) {
    throw error;
}

export default dbConnection;
