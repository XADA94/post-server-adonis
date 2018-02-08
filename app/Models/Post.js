'use strict'

const Model = use('Model')

class Post extends Model {

    static boot () {
        super.boot()
        
        this.addHook('beforeCreate', 'Post.')
    }

    user () {
        return this.hasOne('App/Models/User')
    }

    category () {
        return this.hasOne('App/Models/Category', 'id', 'category_id')
    }

    likes () {
        return this.belongsToMany('App/Models/Like', 'user')
    }
}

module.exports = Post
