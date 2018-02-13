'use strict'

const Res = use('App/Libs/Res')

class Controller {

    constructor() {
        this.res = new Res
        this.status
        this.fields = '*' 
        this.page = 1,
        this.size = 1
        this.sort = ['id','asc']
    }

    setQuerys (query_str) {
        
        if(query_str.fields && query_str.fields.length){
            this.fields = query_str.fields.split(',')
            this.fields.unshift('id')
        }

        if(query_str.page && query_str.size){
            
            this.page = parseInt(query_str.page)
            
            if(query_str.size >= this.size){
                this.size = parseInt(query_str.size)
            }

        }

        if(query_str.sort){

            if(!query_str.sort.search("-")){

                this.sort[0] = query_str.sort.replace('-','')
                this.sort[1] = 'desc'

            }else{

                this.sort[0] = query_str.sort

            }

        }    
    }
}

module.exports = Controller