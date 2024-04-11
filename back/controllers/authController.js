const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const HealthProfessional = require('../models/healthProfessionalModel')

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (user && (await bcrypt.compare(password, user.password))) {
      const SECRET_KEY = process.env.JWT_SECRET
      const token = jwt.sign(
        { id: user.id, email: user.email, bakeryName: user.bakeryName },
        SECRET_KEY,
        { expiresIn: '24h' }
      )
      res.json({ token })
    } else if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.status(401).json({ error: 'Bad credentials' })
    }
}

exports.registerUser = async (req, res) => {
    const { email, password, lastname, firstname, city, adress  } = req.body
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Une erreur est survenue.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      password: hashedPassword,
      lastName : lastname,
      firstName : firstname,
      city,
      adress
    })
    res.status(201).json(user)
} 

exports.loginHealthProfessional = async (req, res) => {
    const { email, password } = req.body
    const healthProfessional = await HealthProfessional.findOne({ where: { email } })

    if (healthProfessional && (await bcrypt.compare(password, healthProfessional.password))) {
      const SECRET_KEY = process.env.JWT_SECRET
      const token = jwt.sign(
        { id: healthProfessional.id, email: healthProfessional.email, lastName: healthProfessional.lastName, firstName: healthProfessional.firstName, city: healthProfessional.city, adress: healthProfessional.adress, status: healthProfessional.status },
        SECRET_KEY,
        { expiresIn: '24h' }
      )
      res.json({ token })
    } else if (!healthProfessional) {
      res.status(404).json({ error: 'Health professional not found' })
    } else {
      res.status(401).json({ error: 'Bad credentials' })
    }
}

exports.registerHealthProfessional = async (req, res) => {
    const { email, password, lastname, firstname, city, adress, status } = req.body
    // Vérifiez si l'utilisateur existe déjà
    const existingHealthProfessional = await HealthProfessional.findOne({ where: { email: email } });

    if (existingHealthProfessional) {
      return res.status(400).json({ error: 'Une erreur est survenue.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const healthProfessional = await HealthProfessional.create({
      email,
      password: hashedPassword,
      lastName : lastname,
      firstName : firstname,
      city,
      adress,
      status
    })
    res.status(201).json(healthProfessional)
}  