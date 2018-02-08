'use strict'

const Model = use('Model')

class Tag extends Model {
    
    posts () {
        return this.belongsToMany('App/Models/PostTag', 'post')
    } 
}

module.exports = Tag
