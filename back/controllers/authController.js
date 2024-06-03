const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const HealthProfessional = require('../models/healthProfessionalModel')
const Availability = require('../models/availabilityModel')
const { sequelize } = require('../services/connectDb');


exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (user && (await bcrypt.compare(password, user.password))) {
      const SECRET_KEY = process.env.JWT_SECRET
      const token = jwt.sign(
        { id: user.id, email: user.email, lastname: user.lastname, firstname: user.firstname, city: user.city, address: user.address,profilePicture: user.profilePicture, role: user.role},
        SECRET_KEY,
        { expiresIn: '1h' }
      )
      res.status(200)
      res.json({ token })
    }else {
      res.status(401).json({ error: 'Bad credentials' })
    }
}

exports.registerUser = async (req, res) => {
    const { email, password, lastname, firstname, city, address, role  } = req.body
    //Véfifie si le mot de passe est minimun de 12 caractères, possède au moins une lettre majuscule, un caractère spécial et un chiffre
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*\d)(?=.*[a-z]).{12,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule et un chiffre.' });
    }
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
      address,
      role
    })
    res.status(201).json(user)
} 

exports.loginHealthProfessional = async (req, res) => {
    const { email, password } = req.body
    const healthProfessional = await HealthProfessional.findOne({ where: { email } })

    if (healthProfessional && (await bcrypt.compare(password, healthProfessional.password))) {
      const SECRET_KEY = process.env.JWT_SECRET
      const token = jwt.sign(
        { id: healthProfessional.id, email: healthProfessional.email, lastname: healthProfessional.lastname, firstname: healthProfessional.firstname, city: healthProfessional.city, address: healthProfessional.address,profession :healthProfessional.profession, profilePicture: healthProfessional.profilePicture, status: healthProfessional.status },
        SECRET_KEY,
        { expiresIn: '1h' }
      )
      res.status(200)
      res.json({ token })
    }else {
      res.status(401).json({ error: 'Bad credentials' })
    }
}

exports.registerHealthProfessional = async (req, res) => {
    const { email, password, lastname, firstname, city, address,profession,profilePicture, status ,availabilities} = req.body
    //Véfifie si le mot de passe est minimun de 12 caractères, possède au moins une lettre majuscule, un caractère spécial et un chiffre
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*\d)(?=.*[a-z]).{12,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule et un chiffre.' });
    }
    // Vérifiez si l'utilisateur existe déjà
    const existingHealthProfessional = await HealthProfessional.findOne({ where: { email: email } });

    if (existingHealthProfessional) {
      return res.status(400).json({ error: 'Une erreur est survenue.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await sequelize.transaction(async (t) => {
      // Créer le professionnel de santé
      const healthProfessional = await HealthProfessional.create({
        email,
        password: hashedPassword,
        lastname : lastname,
        firstname : firstname,
        city,
        profilePicture,
        profession,
        address,
        status
      });
      // Ajouter les disponibilités
      await Availability.bulkCreate(availabilities.map(av => ({
        healthProfessionalId: healthProfessional.id,
        dayOfWeek: av.dayOfWeek,
        startTime: av.startTime
      })), { transaction: t });
    });
    res.status(201).json({ message: 'Health professional created successfully' });
}  