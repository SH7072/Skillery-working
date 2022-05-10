const mongoose = require('mongoose')

const LearnerSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		fullname: { type: String, required: true},
        college: { type: String, required: true},
        degree: { type: String, required: true},
        passing: { type: String, required: true},
        dsa: { type: String, required: true},
        web: { type: String, required: true},
 	},
	{ collection: 'learners' }
)

const model = mongoose.model('learners', LearnerSchema)

module.exports = model