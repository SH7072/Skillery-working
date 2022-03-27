const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	},
	{ collection: 'admins' }
)

const model = mongoose.model('admins', AdminSchema)

module.exports = model