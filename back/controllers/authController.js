const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const HealthProfessional = require('../models/healthProfessionalModel')

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const SECRET_KEY = process.env.JWT_SECRET
      const token = jwt.sign(
        { id: user.id, email: user.email, lastname: user.lastname, firstname: user.firstname, city: user.city, adress: user.adress},
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
      lastname : lastname,
      firstname : firstname,
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
        { id: healthProfessional.id, email: healthProfessional.email, lastname: healthProfessional.lastName, firstname: healthProfessional.firstName, city: healthProfessional.city, adress: healthProfessional.adress,profession :healthProfessional.profession, status: healthProfessional.status },
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
    const { email, password, lastname, firstname, city, adress,profession, status } = req.body
    // Vérifiez si l'utilisateur existe déjà
    const existingHealthProfessional = await HealthProfessional.findOne({ where: { email: email } });

    if (existingHealthProfessional) {
      return res.status(400).json({ error: 'Une erreur est survenue.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const healthProfessional = await HealthProfessional.create({
      email,
      password: hashedPassword,
      lastname : lastname,
      firstname : firstname,
      city,
      profession,
      adress,
      status
    })
    res.status(201).json(healthProfessional)
}  