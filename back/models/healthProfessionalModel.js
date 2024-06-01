const { DataTypes } = require('sequelize')
const { sequelize } = require('../services/connectDb')
const sanitizeHtml = require('sanitize-html');
const HealthProfessional = sequelize.define(
  'HealthProfessional',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    lastname: {
      type: DataTypes.STRING,
      field: 'lastname',
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      field: 'firstname',
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture:{
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_picture'
    },
    status: {
      type: DataTypes.ENUM('verified', 'pending', 'rejected'),
      defaultValue: 'pending'
    }
 
  },
  {
    tableName: 'health_professional',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true // Permet la conversion automatique des noms de champs entre snake case et camel case

  }
)

// Hook "afterFind" pour nettoyer les données avant qu'elles ne soient renvoyées
HealthProfessional.addHook('afterFind', (instanceOrInstances) => {
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
HealthProfessional.prototype.sanitize = function() {
  this.email = sanitizeHtml(this.email, { allowedTags: [] });
  this.lastname = sanitizeHtml(this.lastname, { allowedTags: [] });
  this.firstname = sanitizeHtml(this.firstname, { allowedTags: [] });
  this.city = sanitizeHtml(this.city, { allowedTags: [] });
  this.address = sanitizeHtml(this.address, { allowedTags: [] });
  this.profession = sanitizeHtml(this.profession, { allowedTags: [] });
  this.profilePicture = sanitizeHtml(this.profilePicture, { allowedTags: [] });
  this.status = sanitizeHtml(this.status, { allowedTags: [] });
};

module.exports = HealthProfessional