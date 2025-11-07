const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require('../models/userModel');
const TicketModel = require('../models/ticketModel');

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  port: process.env.DB_PORT,
  retry: { max: 5 }
});

const User = UserModel(sequelize, DataTypes);
const Ticket = TicketModel(sequelize, DataTypes);

User.hasMany(Ticket, {
  foreignKey: 'idUser',
  as: 'tickets',
});

Ticket.belongsTo(User, {
  foreignKey: 'idUser',
  as: 'user',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error.message);
  }
});

module.exports = {
  db: sequelize,
  User,
  Ticket,
};
