const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/coffeeData');

let User = mongoose.model('User', {
  name: {
    type:String
  },
  email: {
    type : String
  },
  mobile: {
    type:Number
  }
});


let Coffee = mongoose.model('Coffee', {
  name: {
    type:String
  },
  items: {
    type:Array
  },
  total :{
    type:Number
  },
  timestamp : {
    type: String
  }
});



module.exports = {User, Coffee};