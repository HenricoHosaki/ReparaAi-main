const { Ticket, User } = require('../config/database');

class AdminService {

async findAllTickets() {
  return await Ticket.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: ['name', 'email']
    }
  });
}

    /**
     * @param {number} idTicket
     */
    async findTicketByPk(idTicket) {
        return await Ticket.findByPk(idTicket);
    }

    /**
     * @param {number} idTicket
     */
    async deleteTicket(idTicket) {
        const ticket = await Ticket.findByPk(idTicket);
        if (ticket) {
            await ticket.destroy();
            return { message: "Ticket deletado com sucesso." };
        }
        return null;
    }

    /**
     * @param {number} idTicket
     * @param {object} ticketData
     */
    async updateTicket(idTicket, ticketData) {
        await Ticket.update(ticketData, { where: { idTicket } });
        return await this.findTicketByPk(idTicket);
    }
}

module.exports = AdminService;