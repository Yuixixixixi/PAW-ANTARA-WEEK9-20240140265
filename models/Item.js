const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Nama item tidak boleh kosong' }
    }
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Harga harus berupa angka bulat' },
      min: { args: [0], msg: 'Harga tidak boleh bernilai negatif' }
    }
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: { msg: 'Stok harus berupa angka bulat' },
      min: { args: [0], msg: 'Stok tidak boleh bernilai negatif' }
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'items',
  timestamps: true
});

module.exports = Item;