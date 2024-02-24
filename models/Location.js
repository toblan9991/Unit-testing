const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new mongoose.Schema({
    name:{type:String, required:true, maxLength: 30},
    description:{type:String, required:true, maxLength:256}
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;