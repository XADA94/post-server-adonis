'use strict'

const Validate = use('App/Validators/Validate')

class ValidateCategory extends Validate {

  constructor () {
    super() 
    
    this.rulesStore = {
    }

    this.rulesUpdate = {
    }

    this.messages = {}
  }
}

module.exports = ValidateCategory