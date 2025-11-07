const express = require('express');
const AdminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware'); 

const adminRouter = express.Router();
const adminController = new AdminController();

adminRouter.use(isAuthenticated, isAdmin);
adminRouter.get('/admin/tickets', adminController.getAllTickets());
adminRouter.put('/admin/tickets/:idTicket', adminController.updateTicket());

module.exports = adminRouter;