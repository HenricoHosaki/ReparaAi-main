const { Router } = require('express');
const TicketController = require('../controllers/ticketController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const upload = require('../config/uploadConfig');

const router = Router();
const ticketController = new TicketController();

router.get('/tickets', isAuthenticated, ticketController.findAllTickets());
router.get('/tickets/:idTicket', isAuthenticated, ticketController.findTicketById());
router.put('/tickets/:idTicket', isAuthenticated, ticketController.updateTicket());
router.delete('/tickets/:idTicket', isAuthenticated, ticketController.deleteTicket());

module.exports = router;