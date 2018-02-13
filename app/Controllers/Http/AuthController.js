'use strict'

const User = use('App/Models/User')

const Controller = use('App/Libs/Controller')

class AuthController extends Controller{

    constructor() {
        super()
    }

    async authenticate ({ request , response , auth }) {

        let status
        const { uid, password } = request.post()

        const query = await User.query()
                                .select('id','username','names','email')
                                .whereRaw('email = ? OR username = ?', [uid,uid]).fetch()

        const user = query.toJSON()[0] 

        if(!user){
            
            this.status = 404
            this.res.setData({
                msg: "El usuario no existe"
            }) 
        
        }else{
            
            try{
                const login = await auth.withRefreshToken().attempt(uid, password, user)

                if(login.token){

                    this.status = 200
                    this.res.setData(login) 
                
                }

            } catch (e) {
                this.status = 500 
                this.res.setErrors({
                    msg:"Combinacion usuario, email y contraseña incorrectas"
                })
            }

        }

        response.status(this.status).send(this.res)
        
    }
}

module.exports = AuthController
