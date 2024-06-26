const { DataTypes } = require('sequelize')
const { sequelize } = require('../services/connectDb')
const sanitizeHtml = require('sanitize-html')
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
      field: 'appointment_address',
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true // Permet la conversion automatique des noms de champs entre snake case et camel case
  }

)

// Permet de définir les relations
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

// Hook "afterFind" pour nettoyer les données avant qu'elles ne soient renvoyées
Appointment.addHook('afterFind', (instanceOrInstances) => {
  if(!instanceOrInstances) return;
  if (Array.isArray(instanceOrInstances)) {
      // Si plusieurs instances sont trouvées, nettoyez chaque instance
      instanceOrInstances.forEach(instance => {
          instance.sanitize();
      });
  } else {
      // Si une seule instance est trouvée, nettoyez cette instance
      instanceOrInstances.sanitize();
  }
});

// Méthode de transformation pour nettoyer les données d'une instance
Appointment.prototype.sanitize = function() {
  this.appointmentDate =  sanitizeHtml(this.appointmentDate, { allowedTags: [] });
  this.appointmentTime = sanitizeHtml(this.appointmentTime, { allowedTags: [] });
  this.appointmentAddress = sanitizeHtml(this.appointmentAddress, { allowedTags: [] });
  this.appointmentCity = sanitizeHtml(this.appointmentCity, { allowedTags: [] });
  this.comment = sanitizeHtml(this.comment, { allowedTags: [] });
};

module.exports = Appointment