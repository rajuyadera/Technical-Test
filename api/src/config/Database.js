import { Sequelize } from "sequelize";

const db = new Sequelize("testcase", "root", "rajuyadera241004", {
    host: 'localhost',
    dialect: "mysql"
})

export default db