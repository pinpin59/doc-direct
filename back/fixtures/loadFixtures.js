const bcrypt = require('bcrypt')
const { sequelize } = require('../services/connectDb')
const fs = require('fs');
const path = require('path');
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
      address: user.address,
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
      address: healthProfessional.address,
      profilePicture: healthProfessional.profilePicture,
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
      appointmentAddress: appointment.appointmentAddress,
      appointmentCity: appointment.appointmentCity,
      comment: appointment.comment
    })
  }
}

async function loadAvaibilities(){
  for(const avaibility of avaibilityData){
    await Avaibility.create({
      
      dayOfWeek: avaibility.dayOfWeek,
      startTime: avaibility.startTime,
      healthProfessionalId: avaibility.healthProfessionalId
    })
  }

}

// Charge les fixtures dans la base de données
async function loadFixtures () {
  try {
    clearUploadsDirectory();
    await sequelize.sync({ force: true })
    await loadUsers()
    await loadHealthProfessionals()
    await loadAvaibilities()
    await loadAppointments()
  } catch (error) {
    console.error('Failed to load fixtures:', error)
  } finally {
    process.exit()
  }
}

function clearUploadsDirectory() {
  const uploadsDir = path.join(__dirname, '../uploads');
  fs.readdir(uploadsDir, (err, files) => {
      if (err) {
          console.error('Failed to read uploads directory:', err);
          return;
      }

      files.forEach(file => {
          const filePath = path.join(uploadsDir, file);
          
          fs.unlink(filePath, (err) => {
              if (err) {
                  console.error(`Failed to delete file ${file}:`, err);
              }
          });
      });
  });
}

clearUploadsDirectory();
loadFixtures()