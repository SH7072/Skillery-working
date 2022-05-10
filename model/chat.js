const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema(
	{
		message: { type: String },
		sender: { type: String },
	},
	{ collection: 'chats' }
)

const model = mongoose.model('chats', ChatSchema)

module.exports = model;
