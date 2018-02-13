'use strict'

const { validate } = use('Validator')

class Validate {
	
	async store (data) {

		const validation = await validate(data, this.rulesStore)
		
		if (validation.fails()) {
			return {
				status: false,
				errors: validation.messages()
			}
		}

		return {
			status: true
		}
  	}

  	async update (data, id) {

		const validation = await validate(data, this.rulesUpdate)

		if (validation.fails()) {
	  		return {
				status: false,
				errors: validation.messages()
	  		}
		}

		return {
	  		status: true
		}
	}
}

module.exports = Validate