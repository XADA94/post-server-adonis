'use strict'

const Transformer = use('App/Libs/Transformer')
const User = use('App/Models/User')
const Category = use('App/Models/Category')

class Post extends Transformer {

    constructor (Instance, relations) {
        super()
        if(Instance){
            Object.assign(this, Instance)
        }

        this.table = 'posts'    
        this.relations  = {
            user: User,
            category: Category
        }
    }

    static boot () {
        super.boot()
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
