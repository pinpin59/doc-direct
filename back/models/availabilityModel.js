const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/connectDb');
const sanitizeHtml = require('sanitize-html');
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

// Hook "afterFind" pour nettoyer les données avant qu'elles ne soient renvoyées
Availability.addHook('afterFind', (instanceOrInstances) => {
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
Availability.prototype.sanitize = function() {
    this.dayOfWeek =  sanitizeHtml(this.dayOfWeek, { allowedTags: [] });
    this.startTime = sanitizeHtml(this.startTime, { allowedTags: [] });
};
module.exports = Availability;
