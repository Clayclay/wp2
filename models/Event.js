const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    
            name: {type: String},
            
            about: {type: String},
            location: {type: Map},
            languages: {type: Array},
            organiser_id: {type: String},
            startDate: { type: Date, default: Date.now },
            cost: {type: Number},
            
        

});

module.exports = mongoose.model('Event', EventSchema);