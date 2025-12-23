const express=require('express');
const dotenv=require('dotenv');
const createTables=require('./database/schema');

dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000;

app.use(express.json());

async function startServer() {
    try{
         await createTables();

         app.get('/health',(req,res)=>{
    res.status(200).json({
        status:"Success",
        message:"Server is Running",
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
    }
    catch(err){
          console.error("Database Initilization Failed ",err);
          process.exit(1);
    }
    
}

startServer();
