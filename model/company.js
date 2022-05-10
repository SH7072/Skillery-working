const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String, required: true}
	},
	{ collection: 'companies' }
)

const model = mongoose.model('companies', CompanySchema)

module.exports = model