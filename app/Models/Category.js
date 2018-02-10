'use strict'

const Transformer = use('App/Libs/Transformer')

class Category extends Transformer {

    posts () {
        return this.hasMany('App/Models/Post')
    }

    table () {
        return 'categories'
    }

}

module.exports = Category
