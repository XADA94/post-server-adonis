'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Post = use('App/Models/Post')
const ValidateUser = use('App/Validators/ValidateUser')

class UserController {

    constructor() {
        this.validate = new ValidateUser
        this.type = "users"
    }

    async getAll ({ request , response }) {
    
        let res = {}, status, query_str = request.get(), fields = '*', page = 1, size = 10, sort = ['id','asc']

        if(query_str.fields){
            fields = query_str.fields.split(',')
            fields.unshift('id')
        }

        if(query_str.page && query_str.size){
            
            page = query_str.page
            
            if(query_str.size > 10){
                size = query_str.size 
            }

        }

        if(query_str.sort){

            if(!query_str.sort.search("-")){

                sort[0] = query_str.sort.replace('-','')
                sort[1] = 'desc'

            }else{

                sort[0] = query_str.sort

            }

        }

        try {
            const count = await Database.from(this.type).count('* as total')    
            const total = count[0].total       
            
            if(total){

                status = 200

                res.meta = {}

                res.meta.total_count = total

                if(total > size){
                    res.meta.total_pages = Math.ceil(total/size)
                }else{
                    res.meta.total_pages = 1
                }

                if(res.meta.total_pages <= page && page > 1){
                    res.meta.prev_page = page - 1
                }

                res.meta.actual_page = page

                if(res.meta.total_pages > page){
                    res.meta.next_page = page + 1
                }

            }else{
                status = 404
            }

            const users = await Database.select(fields)
                                        .from(this.type)
                                        .orderBy(sort[0], sort[1])
                                        .forPage(page, size)

            let userModel = new User

            res.data = userModel.transformArray(users)

            response.status(status).send(res)
        } catch (e) {
            response.status(500).send(e)
        }
    }

    async getOne ({ params , request , response }) {

        let res = {}, status, query_str = request.get(), fields = '*'

        if(query_str.fields){
            fields = query_str.fields.split(',')
            fields.unshift('id')
        }

        try {

            const user = await User.query().select(fields).from(this.type).whereRaw('id = ? OR username = ?', [params.idOrUsername,params.idOrUsername]).fetch()

            let userModel = new User

            

            if(!user.toJSON()[0]){
                status = 404
                res.data = null
            }else{
                status = 200
                res.data = userModel.transform(user.toJSON()[0])
            }

            response.status(status).send(res)
        } catch (e) {
            response.status(500).send(e)
        }
    }

    async getRelatedPosts ({ request , params , response }) {

        let res = {}, status, query_str = request.get(), fields = '*', page = 1, size = 10, sort = ['id','asc']

        if(query_str.fields){
            fields = query_str.fields.split(',')
            fields.unshift('id')
        }

        if(query_str.page && query_str.size){
            
            page = query_str.page
            
            if(query_str.size > 10){
                size = query_str.size 
            }

        }

        if(query_str.sort){

            if(!query_str.sort.search("-")){

                sort[0] = query_str.sort.replace('-','')
                sort[1] = 'desc'

            }else{

                sort[0] = query_str.sort

            }

        }

        try {
            const count = await Database.from('posts').where('user_id', params.idOrUsername).count('* as total')    
            const total = count[0].total       
            
            if(total){

                status = 200

                res.meta = {}

                res.meta.total_count = total

                if(total > size){
                    res.meta.total_pages = Math.ceil(total/size)
                }else{
                    res.meta.total_pages = 1
                }

                if(res.meta.total_pages <= page && page > 1){
                    res.meta.prev_page = page - 1
                }

                res.meta.actual_page = page

                if(res.meta.total_pages > page){
                    res.meta.next_page = page + 1
                }

            }else{
                status = 404
            }

            const posts = await Database.select(fields)
                                        .from('posts')
                                        .where('user_id', params.idOrUsername)
                                        .orderBy(sort[0], sort[1])
                                        .forPage(page, size)

            let postModel = new Post

            res.data = await postModel.transformArray(posts)

            response.status(status).send(res)
        } catch (e) {
            response.status(500).send(e)
        }
    }

    getRelatedLikes ({ request , response }) {

    }

    async store ({ request , response }) {

        let res = {}, userData = request.post()

        const result = await this.validate.store(userData)

        if(!result.status){

            response.status(400).send(result.errors)

        }else{

            try {
                const user = await User.create(userData)

                res.data = user.transform()

                response.status(200).send(res)
            } catch (e) {
                response.status(500).send(e)
            }

        }
    }

    update ({ request , response }) {

    }

    delete ({ params , response }) {

        let res = {}
    }

}

module.exports = UserController
