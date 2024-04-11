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
    lastName: {
      type: DataTypes.STRING,
      field: 'lastname'
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'firstname'
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adress:{
      type: DataTypes.STRING,
      allowNull: false
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
  }
)

module.exports = HealthProfessional