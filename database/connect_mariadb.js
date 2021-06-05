import Sequelize from 'sequelize'
import { config_mariadb } from './config_mariadb.js'

const sequelize = new Sequelize(config_mariadb.db_name, config_mariadb.db_user, config_mariadb.db_pass, {
    host: config_mariadb.db_host,
    port: config_mariadb.db_port,
    dialect: 'mariadb',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialectOptions: {connectTimeout: 1000},
    define: {
        freezeTableName: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


export default sequelize 