const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const Dispositivo = db.define('Dispositivo',{
    codDispositivo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numeroSerie: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigoCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codCliente',
            model: 'clientes'
        }
    },
},{
    timestamps: false,
    tableName: 'dispositivos'
})

module.exports = Dispositivo