'use strict'

const Model = use('Model')

class Category extends Model {

    posts () {
        return this.hasMany('App/Models/Post')
    }

    table () {
        return 'categories'
    }

    transform (Instance) {

        if(Instance){
            Object.assign(this, Instance)
        }
    
        return {
            type: this.table(),
            id: this.id,
            attributes: {
                name: this.name,
                slug: this.slug,
                description: this.description,
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

module.exports = Category
