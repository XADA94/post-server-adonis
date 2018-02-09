'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Post = use('App/Models/Post')

class PostController {

    constructor () {
       
    }

    getAll ({ request , response }) {

    }

    getOne ({ request , response }) {

    }

    getRelatedUsers ({ request , response }) {

    }

    getRelatedLikes ({ request , response }) {

    }

    getRelatedTags ({ request , response }) {

    }

    async store ({ request , response }) {

        let res = {}, postData = request.post()

        //const result = await this.validate.store(postData)

        if(/*!result.status*/ false){

            //response.status(400).send(result.errors)

        }else{

            try {
                const post = await Post.create(postData)

                res.data = await post.transform()

                response.status(200).send(res)
            } catch (e) {
                response.status(500).send(e)
            }

        }
    }

    update ({ request , response }) {

    }

    delete ({ request , response }) {

    }

    deleteRelatedTags ({ request , response }) {

    }

}

module.exports = PostController
