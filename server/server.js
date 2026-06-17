const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const rateLimit=require('express-rate-limit');
const mongoose=require('mongoose');
const Groq=require('groq-sdk');
const path=require('path');
require('dotenv').config();


const config=require('./config.js');
const Visitor=require('./model/visitor.js');
const Conversation=require('./model/conversation.js');
const Message=require('./model/message.js');


const app=express()
const PORT=process.env.PORT || 5000;

const groqApiKey=process.env.GROQ_API_KEY;
if(!groqApiKey){
    console.error('GROQ_API_KEY is not set in environment variables');
    process.exit(1);
}

const mongoURI=process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err)=>{
        console.log('Error connecting to MongoDB:',err);
    });

app.get('/',(req,res)=>{
    res.send('Server is running');
})




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})