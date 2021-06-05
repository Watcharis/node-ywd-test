import dotenv from 'dotenv'

dotenv.config()

const config_mariadb = {
    db_user: process.env.MARIA_DB_USER,     
    db_pass: process.env.MARIA_DB_PASS,
    db_host: process.env.MARIA_DB_HOST,
    db_port: process.env.MARIA_DB_PORT,
    db_name: process.env.MARIA_DB_NAME
}


export { config_mariadb }