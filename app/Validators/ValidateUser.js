'use strict'

const Validate = use('App/Validators/Validate')

class ValidateUser extends Validate {

  constructor () {
    super() 
    
    this.rulesStore = {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required'
    }

    this.rulesUpdate = {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required'
    }

    this.messages = {}
  }

}

module.exports = ValidateUser
