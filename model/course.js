const {Schema,model} = require('mongoose')

const CourseModel=new Schema({
    name:String,
    weeks:[{
        done:Number,
        days:[{
            lectureLink:String,
            homeworkLink:String,
            score:Number
        }]
    }]
})


module.exports = {Course:model('Course',CourseModel)}
