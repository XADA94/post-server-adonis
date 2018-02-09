'use strict'

const Model = use('Model')
const User = use('App/Models/User')
const Category = use('App/Models/Category')

class Post extends Model {

    static boot () {
        super.boot()
        
        //this.addHook('beforeCreate', 'Post.')
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

    async transform (PostInstance) {

        if(PostInstance){
            Object.assign(this, PostInstance)
        }
    
        let user, category

        try { user = await User.find(this.user_id) } catch (e) { }
        try { category = await Category.find(this.category_id) } catch (e) { }

        return {
            type: this.table(),
            id: this.id,
            attributes: {
                title: this.title,
                slug: this.slug,
                short_description: this.short_description,
                description: this.description,
                image: this.image,
                seo_title: this.seo_title,
                seo_keywords: this.seo_keywords,
                seo_description: this.seo_description,
                approved: this.approved,
                user: user ? user.transform() : this.user_id,
                category: category ? category.transform() : this.category_id,
                created_at: this.created_at,
                update_at: this.updated_at
            }
        }
    }
    
    async transformArray (array) {
        let data = []
        for(var key in array){
            Object.assign(this, array[key])
            let post = await this.transform()
            data.push(post)
        }
        return data
    }
}

module.exports = Post
