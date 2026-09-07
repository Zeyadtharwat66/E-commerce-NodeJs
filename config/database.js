const mongoose=require('mongoose');
const dbConnection=()=>{
    mongoose
    .connect(process.env.db_connection_string)
    .then((conn)=>{
        console.log(`database connected : ${conn.connection.host}`);
    })
};
module.exports = dbConnection