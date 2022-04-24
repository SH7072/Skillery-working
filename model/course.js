const {Schema,model} = require('mongoose')

const CourseModel=new Schema({
    name:String,
    week:[{
        type:Schema.Types.ObjectId,
        ref:'Week'
    }]
})

const WeekSchema=new Schema({
    done:Number,
    days:[{
        type:Schema.Types.ObjectId,
        ref:'Day'
    }]
})

const DaySchema=new Schema({
    lectureLink:String,
    homeworkLink:String,
    score:Number
})


module.exports = {Day:model('Day',DaySchema),Week:model('Week',WeekSchema),Course:model('Course',CourseModel)}
