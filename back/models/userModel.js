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

module.exports = User