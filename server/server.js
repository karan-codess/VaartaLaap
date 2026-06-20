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


app.post('/api/widget/onboard',async(req,res)=>{
    const {name,profession,goal}=req.body;
    try{
        if(!name || !profession || !goal){
            return res.status(400).json({error:'Name, profession, and goal are required'});
        }


        const visitor=new Visitor({
            name,
            profession,
            goal
        });
        await visitor.save();


        const conversation=new Conversation({
            visitor:visitor._id,
        });
        await conversation.save();
        
        console.log('New visitor onboarded:',{name,profession,goal});

        return res.status(201).json({message:'Visitor onboarded successfully',visitorId:visitor._id,conversationId:conversation._id,
            visitor:{
                name:visitor.name,
                profession:visitor.profession,
                goal:visitor.goal
            }
        });
    }
    catch(err){
        console.error('Error in onboarding:',err);
        return res.status(500).json({error:'Internal server error'});
    }
})


app.post("/api/widget/history/:visitorId",async(req,res)=>{
    const {visitorId}=req.params;
    try{
        if(!visitorId){
            return res.status(400).json({error:'Visitor ID is required'});
        }
        const conversation=await Conversation.findOne({visitorId});
        if(!conversation){
            return res.status(404).json({error:'Conversation not found for this visitor'});
        }
        const messages=await Message.find({conversationId:conversation._id}).sort({createdAt:1});
        return res.status(200).json({
            visitorName:conversation.visitorId.name,
            conversationId:conversation._id,
            messages:messages.map(msg=>({
                sender:msg.sender,
                text:msg.text,
                createdAt:msg.createdAt
            }))
        });
    }
    catch(err){
        console.error('Error fetching conversation history:',err);
        return res.status(500).json({error:'Internal server error'});
    }
})


app.post('/api/widget/chat',async(req,res)=>{
    const{visitorId,conversationId,message}=req.body;
    try{
        if(!visitorId || !conversationId || !message){
            return res.status(400).json({error:'Visitor ID, conversation ID, and message are required'});
        }
        if(!mongoose.Types.ObjectId.isValid(visitorId) || !mongoose.Types.ObjectId.isValid(conversationId)){
            return res.status(400).json({error:'Invalid visitor ID or conversation ID'});
        }
        const visitor=await Visitor.findById(visitorId);
        if(!visitor){
            return res.status(404).json({error:'Visitor not found'});
        }
        const visitorMessage=new Message({
            conversationId,
            senderId:'visitor',
            text:message
        });
        await visitorMessage.save();

        const pastMessages=await Message.find({conversationId}).sort({createdAt:1}).limit(20);

        const formattedChatHistory=pastMessages.map(msg=>({
            role:msg.senderId==='visitor'?'user':'assistant',
            content:msg.text
        }));


        const visitorContext=`Visitor Name: ${visitor.name}\nProfession: ${visitor.profession}\nGoal: ${visitor.goal}`;
        const fullSystemInstruction=`${config.SYSTEM_PROMPT}\n\n${visitorContext}`;
        const promptMessages=[
            {role:'system',content:fullSystemInstruction},
            ...formattedChatHistory,
            {role:'user',content:message}
        ]

        if(groqApiKey){
            try{
                const completion=await Groq.chat.completions.create({
                    model:config.GROQ_MODEL,
                    messages:promptMessages,
                    maxTokens:1024,
                    temperature:0.7
                })
                
                    
            }catch(err){

            }
        }

    
    }catch(err){

    }
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})