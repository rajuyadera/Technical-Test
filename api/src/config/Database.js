import { Sequelize } from "sequelize";

const db = new Sequelize("testcase", "root", "", {
    host: 'localhost',
    dialect: "mysql"
})

export default db