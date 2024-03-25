const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization; // Extraia o token do cabeçalho Authorization

    if (!token) {
        return res.status(401).json({ msg: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded; // Adicione o usuário decodificado ao objeto de requisição para que possa ser acessado nos controladores
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token inválido' });
    }
};

module.exports = isAuthenticated;