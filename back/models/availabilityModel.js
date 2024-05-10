const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/connectDb');
const HealthProfessional = require('./healthProfessionalModel');

// Définition du modèle Availability
const Availability = sequelize.define('Availability', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    healthProfessionalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'health_professional_id',
        references: {
            model: HealthProfessional,
            key: 'id',
        },
    },
    dayOfWeek: {
        type: DataTypes.ENUM('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'),
        allowNull: false,
        field: 'day_of_week', 
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'start_time',
    }
}, {
    tableName: 'availability',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'    
});

// Définir les relations avec HealthProfessional
HealthProfessional.hasMany(Availability, {
    foreignKey: 'healthProfessionalId',
    as: 'availability',
});

Availability.belongsTo(HealthProfessional, {
    foreignKey: 'healthProfessionalId',
    as: 'healthProfessional',
});

module.exports = Availability;
