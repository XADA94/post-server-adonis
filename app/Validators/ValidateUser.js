'use strict'

const { validate } = use('Validator')

class ValidateUser {

  constructor () {
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

module.exports = ValidateUser
