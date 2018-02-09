'use strict'

const Model = use('Model')

class User extends Model {

  static boot () {
    super.boot()
    /**
     * A hook to bash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  table () {
    return 'users'
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  transform (Instance) {

    if(Instance){
      Object.assign(this, Instance)
    }

    return {
      type: this.table(),
      id: this.id,
      attributes: {
        username: this.username,
        names: this.names,
        email: this.email,
        avatar: this.avatar,
        created_at: this.created_at,
        update_at: this.updated_at
      }
    }
  }

  transformArray (array) {
    let data = []
    for(var key in array){
      Object.assign(this, array[key])
      data.push(this.transform())
    }
    return data
  }
}

module.exports = User
