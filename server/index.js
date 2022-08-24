
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user-models')
const Admin = require('./models/admin-models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express()



app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/w14-project')

app.post('/api/signup',async(req,res)=>{
    console.log(req.body);
    try{
        const newPassword = await bcrypt.hash(req.body.password,10)
         await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({status:'ok'})
    } catch(err){
        console.log(err);
        res.json({status:'error', error: 'Duplicate email'})

    }
})

app.post('/api/login', async(req,res)=>{
    console.log(req.body);
    const user = await User.findOne({
        email: req.body.email,
    })
    if(!user) {
        return  {status:'error',error:'Invalid'}}

    const isPasswordValid = await bcrypt.compare(req.body.password,user.password)

    if(isPasswordValid){
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        },'anonymous123')
        return res.json({status:'ok',user:token})
    }else{
        return res.json({status:'error',user:false})
    }
})

app.get('/api/quote', async(req,res)=>{
    // console.log(req.body);
    const token = req.headers['x-access-token']

    try{
    const decoded = jwt.verify(token,'anonymous123')
    const email = decoded.email
    const user = await User.findOne({email: email})

    return res.json({status:'ok',quote:user.quote})
    } catch(error){
        console.log(error);
        res.json({status:'error',error:'invalid token'})
    }

})

app.post('/api/quote', async(req,res)=>{
    // console.log(req.body,'juy');
    const token = req.headers['x-access-token']

    try{
    const decoded = jwt.verify(token,'anonymous123')
    const email = decoded.email
    // console.log('email',email);
       await User.updateOne(
        {email: email},
        {$set:{quote:req.body.quote}})
    return res.json({status:'ok'})
    } catch(error){
        console.log(error);
        res.json({status:'error',error:'invalid token'})
    }

})
    

// admin

app.post('/api/adminlogin',async(req,res)=>{
    const admin =  await Admin.findOne({
        email:req.body.email,
    })
    if(!admin){
        return res.json({ status: 'error', admin: false, error: 'invalid email' });
    }
    let passwordCheck = await bcrypt.compare(req.body.password,admin.password)
    console.log('check',passwordCheck);

    if(passwordCheck){
        const adtoken = jwt.sign({
        email:admin.email,
        },'secretkey123')
        return res.json({status:'ok',admin:adtoken})
    }else{
        return res.json({status:'error',admin:false})
    }
})

app.get('/api/userData',async(req,res)=>{
    console.log('received ur req');
    try{
       let userData = await User.find({})
    //    console.log('userdata',userData);
       return res.json({status:'ok',userData})
    } catch(err){
        console.log('err',err);
       return res.json({status:'error',error:'no data found'}) 
    }
})

app.post('/api/updateuser',async(req,res)=>{
    try{
          await User.updateOne(
            {_id:req.body.id},{...req.body}
        )
        return res.json({status:'ok'})
    } catch(err){
        return res.json({status:'error'})
    }
})

app.delete('/api/deleteUser',async (req, res) => {
    console.log('deleteee');
    try {
      console.log(req.body);
      let response = await User.deleteOne({ _id: req.body.id });
      console.log(response);
      return res.json({ status: true });
    } catch (err) {
      console.log(err);
    }
});



app.listen(1337,()=>{
    console.log('server started on 1337')
})