import mysql from "mysql"


export const db = mysql.createConnection({
    host: "byg6pj4yq5rqua2wemyy-mysql.services.clever-cloud.com",
    user: "u99cuyvzdmjtwugr" ,
    password: process.env.DBPASSWORD
    , database: "byg6pj4yq5rqua2wemyy"
})
/*
export const db = mysql.createConnection({
    host: "sql11.freesqldatabase.com",
    user: "sql11673798",
    password: "hjU4wxvFs2"
    , database: "sql11673798"
process.env.OPENKEY
UBuQ4H30F1qnpCtLkOV5
})*/