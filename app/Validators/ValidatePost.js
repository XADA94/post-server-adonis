'use strict'

const Validate = use('App/Validators/Validate')

class ValidatePost extends Validate {

  constructor () {
    super() 
    
    this.rulesStore = {
    }

    this.rulesUpdate = {
    }

    this.messages = {}
  }
}

module.exports = ValidatePost