const mongoose = require('mongoose')

const DaySchema = new mongoose.Schema(
	{
		topicName: String,
        lectureLink:String,
        homeworkLink:String,
        flag: Number,
        score:Number
	},
	{ collection: 'days' }
)

const model = mongoose.model('days', DaySchema)

module.exports = model