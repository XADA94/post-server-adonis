'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.string('short_description', 80).notNullable()
      table.string('description', 254).notNullable()
      table.string('image', 254).nullable()
      table.string('seo_title', 254)
      table.string('seo_keywords', 254)
      table.string('seo_description', 254)
      table.boolean('approved').defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
