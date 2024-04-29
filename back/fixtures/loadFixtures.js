const bcrypt = require('bcrypt')
const { sequelize } = require('../services/connectDb')
// Models
const HealthProfessional = require('../models/healthProfessionalModel')
const User = require('../models/userModel')
const Appointment = require('../models/appointmentModel')
const Avaibility = require('../models/availabilityModel')
// Data
const healthProfessionalsData = require('./data/healthProfessionalsData')
const usersData = require('./data/usersData')
const appointmentsData = require('./data/appointmentsData')
const avaibilityData = require('./data/availabilityData')

async function loadUsers () {
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    await User.create({
      email: user.email,
      password: hashedPassword,
      lastname: user.lastname,
      firstname: user.firstname,
      city: user.city,
      adress: user.adress,
      role: user.role
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
      lastname: healthProfessional.lastname,
      firstname: healthProfessional.firstname,
      city: healthProfessional.city,
      profession: healthProfessional.profession,
      adress: healthProfessional.adress,
      status: healthProfessional.status
    })
  }
}

// Charge les rendez-vous dans la base de données
async function loadAppointments () {
  for(const appointment of appointmentsData){
    await Appointment.create({
      userId: appointment.userId,
      healthProfessionalId: appointment.healthProfessionalId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      appointmentAdress: appointment.appointmentAdress,
      comment: appointment.comment
    })
  }
}

async function loadAvaibilities(){
  for(const avaibility of avaibilityData){
    await Avaibility.create({
      
      day: avaibility.day,
      startTime: avaibility.startTime,
      endTime: avaibility.endTime,
      isAvailable: avaibility.isAvailable,
      healthProfessionalId: avaibility.healthProfessionalId
    })
  }

}

// Charge les fixtures dans la base de données
async function loadFixtures () {
  try {
    await sequelize.sync({ force: true })
    await loadUsers()
    await loadHealthProfessionals()
    await loadAvaibilities()
    await loadAppointments()
    console.log('All fixtures loaded successfully')
  } catch (error) {
    console.error('Failed to load fixtures:', error)
  } finally {
    process.exit()
  }
}

loadFixtures()