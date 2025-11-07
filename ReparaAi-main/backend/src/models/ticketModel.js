module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    idTicket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    header: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      // Use os valores que melhor representam o ciclo de vida da sua solicitação
      type: DataTypes.ENUM('Aberto', 'Em Andamento', 'Concluído', 'Cancelado'),
      allowNull: false,
      defaultValue: 'Aberto', // Define o status inicial no banco
    },
    localization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // Armazena o caminho ou URL da imagem
      allowNull: true,        // Permite null, já que o upload é opcional
    },
  });

  return Ticket;
};
