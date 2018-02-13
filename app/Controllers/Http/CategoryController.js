'use strict'

const Database = use('Database')
const Model = use('App/Models/Category')
const Post = use('App/Models/Post')
const ValidateCategory = use('App/Validators/ValidateCategory')

const Controller = use('App/Libs/Controller')

class CategoryController extends Controller {

    constructor() {
        super()
        
        this.validate  = new ValidateCategory
        this.model     = new Model
        this.postModel = new Post
        this.type      = "categories"
    }

    async getAll ({ request , response }) {
    
        this.setQuerys(request.get())

        try {
            const count = await Database.from(this.type).count('* as total')    
            const total = count[0].total       
            
            if(total){

                this.status = 200

                this.res.setMeta("total_count", total)

                if(total > size){
                    this.res.setMeta("total_pages", Math.ceil(total/size))
                }else{
                    this.res.setMeta("total_pages", 1)
                }

                if(this.res.meta.total_pages <= page && page > 1){
                    this.res.setMeta("prev_page", page - 1)
                }

                this.res.setMeta("actual_page", page)

                if(this.res.meta.total_pages > page){
                    this.res.setMeta("next_page", page + 1)
                }

                this.res.setMeta("per_page", size)

            }else{
                this.status = 404
            }

            const rows = await Database.select(fields)
                                        .from(this.type)
                                        .orderBy(sort[0], sort[1])
                                        .forPage(page, size)

            this.res.setData(await this.model.transformArray(rows))

            response.status(this.status).send(this.res)
        } catch (e) {
            response.status(500).send(e)
        }
    }

    async getOne ({ params , request , response }) {

        this.setQuerys(request.get())

        try {

            const query = await Model.query()
                                    .select(fields)
                                    .from(this.type)
                                    .whereRaw('id = ? OR slug = ?', [params.idOrSlug, params.idOrSlug]).fetch()

            let row = new Model(query.toJSON()[0])

            if(!query.toJSON()[0]){
                this.status = 404
                this.res.setData(null) 
            }else{
                this.status = 200
                this.res.setData(await row.transform()) 
            }

        } catch (e) {
            this.status = 500
            this.res.setErrors({
                msg: "Hubo un error"
            })
        }

        response.status(this.status).send(this.res)
    }

    async getRelatedPosts ({ request , params , response }) {

        this.setQuerys(request.get())

        try {
            const count = await Database.from('posts').where('category_id', params.idOrSlug).count('* as total')    
            const total = count[0].total       
            
            if(total){

                this.status = 200

                this.res.setMeta("total_count", total)

                if(total > this.size){
                   this.res.setMeta("total_pages", Math.ceil(total/this.size))
                }else{
                   this.res.setMeta("total_pages", 1)
                }

                if(this.res.setMeta.total_pages <= this.page && this.page > 1){
                   this.res.setMeta("prev_page", page - 1)
                }

                this.res.setMeta("actual_page", this.page)

                if(this.res.setMeta.total_pages > this.page){
                   this.res.setMeta("next_page", this.page + 1)
                }

                this.res.setMeta("per_page", this.size)

            }else{
                this.status = 404
            }

            const posts = await Database.select(this.fields)
                                        .from('posts')
                                        .where('category_id', params.idOrUsername)
                                        .orderBy(this.sort[0], this.sort[1])
                                        .forPage(this.page, this.size)

            let postModel = new Post

            this.res.setData(await postModel.transformArray(posts))

        } catch (e) {
            this.status = 500
            this.res.setErrors({
                msg: "Hubo un error"
            })
        }

        response.status(this.status).send(this.res)
    }

    async store ({ request , response }) {

        let categoryData = request.post()

        const result = await this.validate.store(categoryData)

        if(!result.status){

            this.res.setErrors(result.errors)

        }else{

            try {
                const category = await Category.create(categoryData)

                this.status = 200
                this.res.setData(await category.transform())

            } catch (e) {
                this.status = 500
                this.res.setErrors({
                    msg: "Ocurrio un error al guardar el registro"
                })
            }

        }

        response.status(this.status).send(this.res)
    }

    update ({ request , response }) {

    }

    delete ({ request , response }) {

    }

}

module.exports = CategoryController
