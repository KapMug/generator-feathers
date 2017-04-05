'use_strict'

const Joi = require('joi')

module.exports.<%= camelName %>Schema = Joi.object().keys({
   id: Joi.string().required()
})