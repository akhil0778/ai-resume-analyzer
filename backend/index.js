const express=require('express');
const dotenv=require('dotenv');

dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000;

app.use(express.json());

app.get('/health',(req,res)=>{
    res.status(200).json({
        status:"Success",
        message:"Server is Running",
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
