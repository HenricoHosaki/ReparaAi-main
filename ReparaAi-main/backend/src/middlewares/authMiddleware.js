const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado: Token não fornecido.' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        req.userId = decoded.idUser;
        req.userRole = decoded.role; 

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
};


const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ 
            error: 'Permissão negada. Esta rota é restrita a administradores.'
        });
    }
    return next();
};

module.exports = { 
    isAuthenticated,
    isAdmin
};