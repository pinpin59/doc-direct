const bcrypt = require('bcrypt')
const { sequelize } = require('../services/connectDb')
// Models
const HealthProfessional = require('../models/healthProfessionalModel')
const User = require('../models/userModel')
// Data
const healthProfessionalsData = require('./data/healthProfessionalsDatas')
const usersData = require('./data/usersData')

async function loadUsers () {
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    await User.create({
      email: user.email,
      password: hashedPassword,
      lastName: user.lastname,
      firstName: user.firstname,
      city: user.city,
      adress: user.adress
    })
  }
}

// Charge les professionnels de santé dans la base de données
async function loadHealthProfessionals () {
  for (const healthProfessional of healthProfessionalsData) {
    const hashedPassword = await bcrypt.hash(healthProfessional.password, 10)
    await HealthProfessional.create({
      email: healthProfessional.email,
      password: hashedPassword,
      lastName: healthProfessional.lastName,
      firstName: healthProfessional.firstName,
      city: healthProfessional.city,
      adress: healthProfessional.adress,
      status: healthProfessional.status
    })
  }
}

// Charge les fixtures dans la base de données
async function loadFixtures () {
  try {
    await sequelize.sync({ force: true })
    await loadUsers()
    await loadHealthProfessionals()
    console.log('All fixtures loaded successfully')
  } catch (error) {
    console.error('Failed to load fixtures:', error)
  } finally {
    process.exit()
  }
}

loadFixtures()