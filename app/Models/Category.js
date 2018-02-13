'use strict'

const Transformer = use('App/Libs/Transformer')

class Category extends Transformer {

    constructor (Instance, relations) {
        super()
        if(Instance){
            Object.assign(this, Instance)
        }

        this.table = 'categories'
    }

    posts () {
        return this.hasMany('App/Models/Post')
    }

}

module.exports = Category
