const mongoose = require('mongoose')

const LearnerSchema = new mongoose.Schema(
	{
		fullname: { type: String, required: true},
		email: { type: String, required: true},
        college: { type: String, required: true},
        degree: { type: String, required: true},
        passing: { type: String, required: true},
        scores: { type: String, required: true}
 	},
	{ collection: 'learners' }
)

const model = mongoose.model('learners', LearnerSchema)

module.exports = model