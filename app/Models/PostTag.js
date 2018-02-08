'use strict'

const Model = use('Model')

class PostTag extends Model {

    post () {
        return this.hasOne('App/Models/Post')
    }

    tag () {
        return this.hasOne('App/Models/Tag')
    }
}

module.exports = PostTag
