const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const initDB = require('../database/db')

const JWT_SECRET=process.env.JWT_SECRET || 'akhil_super_secret_key';

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = await initDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User Registered Successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const db = await initDB();
        const user=await db.get(`SELECT * FROM users WHERE email=?`,[email]);
        if(!user){
            return res.status(401).json({message:'Invalid Credientials'});
        }

        const isMatched=await bcrypt.compare(password,user.password);
        if(!isMatched){
            return res.status(401).json({message:"Invalid Credientials"});
        }

        const token =jwt.sign({
            userId:user.id,email:user.email},
        JWT_SECRET,{expiresIn:'1h'});
        res.json({token})

    }
    catch(error){
        res.status(500).json({message:"Login Failed"})
    }

}