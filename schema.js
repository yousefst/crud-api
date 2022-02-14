const mongoose=require('mongoose');

const noteSchema=mongoose.Schema({
  title:{type:String,required:true},
  content:{type:String,required:true},
  createdData:Date,
  updatedData:Date
});
module.exports=mongoose.model('note',noteSchema);