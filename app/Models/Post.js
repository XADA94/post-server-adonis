'use strict'

const Transformer = use('App/Libs/Transformer')
const User = use('App/Models/User')
const Category = use('App/Models/Category')

class Post extends Transformer {

    constructor (Instance) {
        super()
        
        this.init(Instance, 'posts', {
            user: User,
            category: Category
        })
        
    }

    static boot () {
        super.boot()
        
    }

    table () {
        return 'posts'
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
