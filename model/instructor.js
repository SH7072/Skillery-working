const mongoose = require('mongoose')

const InstructorSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		fullname: { type: String, required: true},
		qualification: { type: String, required: true},
		experience: { type: String, required: true},
	},
	{ collection: 'instructors' }
)

const model = mongoose.model('instructors', InstructorSchema)

module.exports = model