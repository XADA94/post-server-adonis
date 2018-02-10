'use strict'

const Model = use('Model')

class Transformer extends Model {

    init (Instance, table, relations) {
        
        if(Instance){
            Object.assign(this, Instance)
        }

        this.table = table

        this.relations  = relations
    }

    async transform () {
    
        let structure =  {
            id: this.id,
            type: this.table,
            attributes: {}
        }

        let attributesModel = Object.keys(this.$attributes)

        for(var key in attributesModel){
            if(attributesModel[key] !== 'id' && attributesModel[key] !== 'table' && attributesModel[key] !== 'relations'){
                structure.attributes[attributesModel[key]] = this[attributesModel[key]]
            }
        
            if(attributesModel[key].includes("_id")){
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

                    structure.attributes[prefix] = i ? await i.transform() : foreignKey
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