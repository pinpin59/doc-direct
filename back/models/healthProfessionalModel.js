const { DataTypes } = require('sequelize')
const { sequelize } = require('../services/connectDb')

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
    timestamps: true, // turns off createdAt and updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true // Permet la conversion automatique des noms de champs entre snake case et camel case

  }
)

module.exports = HealthProfessional