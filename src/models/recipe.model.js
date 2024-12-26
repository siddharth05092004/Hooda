var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema( 
		{
      title: { type: String, required: true },
      making_time: { type: String, required: true },
      serves: { type: String, required: true },
      ingredients: { type: String, required: true },
      cost: { type: Number, required: true }
        }
        ,
        {versionKey: false,
          timestamps: true,
        }
);

module.exports = recipe = mongoose.model('recipe', schema);