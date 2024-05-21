const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./model");
const SECRET_KEY = "33ade8f1-0755-4760-9646-60cb1a1d4fd4"

// Função para registrar um novo usuário
async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para autenticar um usuário
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para obter detalhes do usuário autenticado
async function getUser(req, res) {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Middleware para verificar o token JWT
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.userId = verified.id;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
}

// Exporta as funções e o middleware
module.exports = {
  registerUser,
  login,
  getUser,
  authenticateToken,
};
