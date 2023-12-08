
module.exports = {
    muntipleMongooseToObject: function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject({ getters: true, virtuals: false }));
    },
    mongooseToObject: function (mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
};

