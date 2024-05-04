const { DataTypes } = require('sequelize')
const { sequelize } = require('../services/connectDb')
const User = require('./userModel')
const HealthProfessional = require('./healthProfessionalModel')

const Appointment = sequelize.define(
  'Appointment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false
    },
    healthProfessionalId: {
      type: DataTypes.INTEGER,
      field: 'health_professional_id',
      allowNull: false
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      field: 'appointment_date',
      allowNull: false
    },
    appointmentTime: {
      type: DataTypes.TIME,
      field: 'appointment_time',
      allowNull: false
    },
    appointmentAddress: {
      type: DataTypes.STRING,
      field: 'appointment_adress',
      allowNull: false
    },
    appointmentCity: {
      type: DataTypes.STRING,
      field: 'appointment_city',
      allowNull: false
    },
    comment : {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    tableName: 'appointment',
    timestamps: true, // turns off createdAt and updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true // Permet la conversion automatique des noms de champs entre snake case et camel case
  }

)

User.hasMany(Appointment, {
  foreignKey: 'userId',
  as: 'appointments'
})

HealthProfessional.hasMany(Appointment, {
  foreignKey: 'healthProfessionalId',
  as: 'appointments'
})

Appointment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

Appointment.belongsTo(HealthProfessional, {
  foreignKey: 'healthProfessionalId',
  as: 'healthProfessional'
})

module.exports = Appointment