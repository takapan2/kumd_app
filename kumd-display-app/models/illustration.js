'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Illustration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Illustration.init({
    userId: DataTypes.INTEGER,
    penname: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    title: DataTypes.STRING,
    size: DataTypes.STRING,
    caption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Illustration',
  });
  return Illustration;
};