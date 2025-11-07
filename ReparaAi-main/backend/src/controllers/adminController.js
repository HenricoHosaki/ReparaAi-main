const { Ticket, User } = require('../config/database'); 
const adminService = require ('../services/adminService');

const VALID_STATUSES = ['Aberto', 'Em Análise', 'Em Reparo', 'Concluído', 'Cancelado'];

class AdminController {

    
    async findAllTickets(req, res) {
        try {
            const ticketsData = await adminService.findAll({
            
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['idUser', 'name', 'email', 'phone', 'cep']
                }],
                order: [['createdAt', 'DESC']]
            });

            return res.status(200).json({ Tickets: ticketsData });
        } catch (error) {
            console.error('Erro ao buscar solicitações (Admin):', error);
            return res.status(500).json({ error: 'Erro interno ao buscar solicitações.' });
        }
    }

    async findTicketById(req, res) {
        try{
            const { idTicket } = req.params;
            const ticketData = await adminService.findByPk(idTicket);
            
            if (!ticketData) {
                return res.status(404).json({ error: 'Solicitação não encontrada.' });
        }
    }catch (error) {
        console.error('Erro ao buscar solicitação por ID (Admin):', error);
        return res.status(500).json({ error: 'Erro interno ao buscar solicitação.' });
    }
}

    async updateTicket(req, res) {
    try {
      const { idTicket } = req.params;
      const ticketData = req.body;

      if (!idTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      await adminService.updateTicket(idTicket, ticketData);
      const result = await adminService.findTicketByPk(idTicket);

      return res.status(200).json({ Updated: result });
    } catch (e) {
      console.error("Erro ao atualizar ticket:", e.message);
      return res.status(400).json({ Error: e.message });
    }
  }

    async deleteTicket(req, res) {
    try {
      const { idTicket } = req.params;

      if (!idTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      const deletedTicket = await adminService.deleteTicket(idTicket);
      return res.status(200).json({ Deleted: deletedTicket });
    } catch (e) {
      console.error("Erro ao deletar ticket:", e.message);
      return res.status(400).json({ Error: e.message });
    }
  }
}

module.exports = AdminController;