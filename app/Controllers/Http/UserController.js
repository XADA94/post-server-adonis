'use strict'

const Database = use('Database')
const Model = use('App/Models/User')
const Post = use('App/Models/Post')
const Like = use('App/Models/Like')
const ValidateUser = use('App/Validators/ValidateUser')

const Controller = use('App/Libs/Controller')

class UserController extends Controller {

    constructor() {
        super()

        this.validate  = new ValidateUser
        this.model     = new Model
        this.postModel = new Post
        this.likeModel = new Like
        this.type      = "users"
    }

    async getAll ({ request , response }) {
        
        this.setQuerys(request.get())

        try {
            const count = await Database.from(this.type).count('* as total')    
            const total = count[0].total       
            
            if(total){

                this.status = 200

                this.res.setMeta("total_count", total)

                if(total > this.size){
                   this.res.setMeta("total_pages", Math.ceil(total/this.size))
                }else{
                   this.res.setMeta("total_pages", 1)
                }

                if(this.res.meta.total_pages <= this.page && this.page > 1){
                   this.res.setMeta("prev_page", this.page - 1)
                }

               this.res.setMeta("actual_page", this.page)

                if(this.res.meta.total_pages > this.page){
                   this.res.setMeta("next_page", this.page + 1)
                }

               this.res.setMeta("per_page", this.size)

            }else{
                this.status = 404
            }

            const rows = await Database.select(this.fields)
                                        .from(this.type)
                                        .orderBy(this.sort[0], this.sort[1])
                                        .forPage(this.page, this.size)

           this.res.setData(await this.model.transformArray(rows))

        } catch (e) {
            this.status = 500
            this.res.setErrors({
                msg: "Hubo un error"
            }) 
        }

        response.status(this.status).send(this.res)
    }

    async getOne ({ params , request , response }) {

        this.setQuerys(request.get())

        try {

            const query = await Model.query()
                                    .select(this.fields)
                                    .from(this.type)
                                    .whereRaw('id = ? OR username = ?', [params.idOrUsername,params.idOrUsername]).fetch()

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
            const count = await Database.from('posts').where('user_id', params.id).count('* as total')    
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
                   this.res.setMeta("prev_page", this.page - 1)
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
                                        .where('user_id', params.id)
                                        .orderBy(this.sort[0], this.sort[1])
                                        .forPage(this.page, this.size)

            let postModel = new Post

           this.res.setData(await postModel.transformArray(posts))

            response.status(this.status).send(this.res)
        } catch (e) {
            response.status(500).send(e)
        }
    }

    getRelatedLikes ({ request , response }) {

    }

    async store ({ request , response }) {

         userData = request.post()

        const result = await this.validate.store(userData)

        if(!result.status){

            this.status = 400
            this.res.setErrors(result.errors)

        }else{

            try {
                const user = await User.create(userData)

                this.status = 200
                this.res.setData(await user.transform())

            } catch (e) {
                this.status = 500
                this.res.setErrors({
                    msg: "Ocurrio un error al guardar el registro"
                })
            }

        }

        response.status(200).send(this.res)
    }

    update ({ request , response }) {

    }

    delete ({ params , response }) {

    }

}

module.exports = UserController
