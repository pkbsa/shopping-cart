var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required:true},
    address: {type: String, required:true},
    name: {type:String, required:true},
    phone: {type:String, required:true},
    paymentId: {type: String, required:true},
    paymentDate: {type: String, required:true},
    paymentMethod: {type: String, required:true},
    status: {type: String, required:true},
    date: {type: String, required:true}
})

module.exports = mongoose.model('Order', schema);