const { DataTypes } = require('sequelize')
const { sequelize } = require('../services/connectDb')
const sanitizeHtml = require('sanitize-html')
const User = sequelize.define(
  'User',
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
      allowNull: false,
      field: 'lastname'
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'firstname'
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture:{
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_picture'
    },
    role: {
      type: DataTypes.ENUM('ROLE_ADMIN', 'ROLE_USER'),
      allowNull: false
    }
  },
  {
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

// Hook "afterFind" pour nettoyer les données avant qu'elles ne soient renvoyées
User.addHook('afterFind', (instanceOrInstances) => {
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
User.prototype.sanitize = function() {
  this.email =  sanitizeHtml(this.email, { allowedTags: [] });  
  this.lastname = sanitizeHtml(this.lastname, { allowedTags: [] });
  this.firstname = sanitizeHtml(this.firstname, { allowedTags: [] });
  this.city = sanitizeHtml(this.city, { allowedTags: [] });
  this.address = sanitizeHtml(this.address, { allowedTags: [] });
  this.profilePicture = sanitizeHtml(this.profilePicture, { allowedTags: [] });
  this.role = sanitizeHtml(this.role, { allowedTags: [] });
};

module.exports = User