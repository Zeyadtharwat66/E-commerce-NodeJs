const express = require("express");
const dotenv=require("dotenv");
const morgan =require("morgan");
const ApiError = require('./utils/ApiError');
const globalError=require('./middleware/errormiddleware')
dotenv.config({path:"config.env"});
const dbConnection=require("./config/database")
const categoryRoute=require("./routes/categoryRoute");
dbConnection();

const app = express();
app.use(express.json());

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
    console.log('mode : '+process.env.NODE_ENV);
}

app.use("/api/v1/categories",categoryRoute);
app.all("/{*splat}",(req,res,next)=>{
    next(new ApiError(`can't find ${req.originalUrl}`,400));
});
app.use(globalError);

const PORT=process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on port 8000");
});
process.on('unhandledRejection',(err)=>{
    console.error(`unhandledRejection : ${err}`);
    process.exit(1);
});