'use strict'

const Model = use('Model')

class Like extends Model {

    post () {
        return this.hasOne('App/Models/Post')
    }

    user () {
        return this.hasOne('App/Models/User')
    }
}

module.exports = Like
