const mongoose = require('mongoose');

const Connect = async () =>{
    try{
        await mongoose.connect(process.env.URI);
        console.log(`db connected: `);
    }catch (err){
        throw new Error('error from db',err);
    }
}

module.exports = Connect;