const { DataTypes } = require('sequelize')
const { sequelize } = require('../services/connectDb')

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
    adress:{
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'user',
    timestamps: true, // turns off createdAt and updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = User