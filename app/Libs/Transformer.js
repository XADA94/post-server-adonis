'use strict'

const Model = use('Model')

class Transformer extends Model {

    constructor () {
        super()
    }

    async transform () {
        let structure =  {
            id: this.id,
            type: this.table,
            attributes: {}
        }

        let attributesModel = Object.keys(this.$attributes)

        for(var key in attributesModel){
            if(attributesModel[key] !== 'id' && attributesModel[key] !== 'table' && attributesModel[key] !== 'relations' && attributesModel[key] !== 'password' && !attributesModel[key].includes("_id")){
                structure.attributes[attributesModel[key]] = this[attributesModel[key]]
            }
        
            if(attributesModel[key].includes("_id")){
                delete this[attributesModel[key]]
                structure.attributes[attributesModel[key].replace('_id', '')]
            }
        }

        if(this.relations){

            let relKeys = Object.keys(this.relations)

            for(var key in relKeys){
                try { 
                    let model = this.relations[relKeys[key]]

                    let prefix = relKeys[key].toLowerCase()
                    let foreignKey = this[prefix+'_id']
                   
                    let i = await model.find(foreignKey)

                    let new_model = new model

                    structure.attributes[prefix] = i ? await i.transform() : foreignKey
                    structure.attributes[prefix].type = new_model.table
                } catch (e) { }
            }

        }

        return structure
    }

    async transformArray (array) {
        let data = []
        for(var key in array){
            Object.assign(this, array[key])
            let Instance = await this.transform()
            data.push(Instance)
        }
        return data
    }
} 

module.exports = Transformer