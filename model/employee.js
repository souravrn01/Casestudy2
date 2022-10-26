const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee_detail = new Schema({

    name:String,
    location:String,
    position:String,
    salary:Number

})

const EmployeeData = mongoose.model('employee',employee_detail)

module.exports = EmployeeData


