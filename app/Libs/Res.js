'use strict'

class Res {

    constructor () {
        this.data = null
    }

    setMeta (key, value) {
        if(!this.meta){
            this.meta = {}
        }
        this.meta[key] = value
    }

    setData(data) {
        this.data = data
    }

    setErrors(data) {
        delete this.data
        this.errors = data
    }
}

module.exports = Res