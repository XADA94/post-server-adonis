'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.on('/docs').render('docs')

Route.group(() => {
    
    //LOGIN AND LOGOUT
    Route.post('authenticate', 'AuthController.authenticate')

    //USERS
    Route.get('users', 'UserController.getAll') //ok
    Route.get('users/:idOrUsername', 'UserController.getOne') //ok
    Route.get('users/:id/posts', 'UserController.getRelatedPosts') //ok
    Route.get('users/:idOrUsername/likes', 'UserController.getRelatedLikes').middleware('auth')
    Route.post('users', 'UserController.store')
    Route.put('users/:idOrUsername', 'UserController.update').middleware('auth')
    Route.put('users/:idOrUsername', 'UserController.delete').middleware('auth')

    //POSTS
    Route.get('posts', 'PostController.getAll') //ok
    Route.get('posts/:idOrSlug', 'PostController.getOne') //ok
    Route.get('posts/:idOrSlug/likes', 'PostController.getRelatedLikes')
    Route.get('posts/:idOrSlug/tags', 'PostController.getRelatedTags')
    Route.post('posts', 'PostController.store').middleware('auth') //ok
    Route.put('posts/:id', 'PostController.update').middleware('auth')
    Route.delete('posts/:idOrSlug', 'PostController.delete').middleware('auth')
    Route.delete('posts/:idOrSlug/tags/:id', 'PostController.deleteRelatedTags')
    
    //CATEGORIES
    Route.get('categories', 'CategoriesController.getAll') //ok
    Route.get('categories/:idOrSlug', 'CategoriesController.getOne') //ok
    Route.get('categories/:idOrSlug/posts', 'CategoriesController.getRelatedPosts') //ok
    Route.post('categories', 'CategoriesController.store') //ok validarAdmin
    Route.put('categories/:idOrSlug', 'CategoriesController.update') // validarAdmin
    Route.delete('categories/:idOrSlug', 'CategoriesController.delete') //validarAdmin
    
    //TAGS
    Route.get('tags', 'TagsController.getAll')
    Route.get('tags/:id', 'TagsController.getOne')
    Route.get('tags/:id/posts', 'TagsController.getRelatedPosts')
    Route.delete('tags/:id', 'TagsController.delete') //validarAdmin

    //LIKES
    Route.post('likes', 'TagsController.store').middleware('auth')
    Route.delete('likes/:id', 'TagsController.delete').middleware('auth')

}).prefix('api/v1')

//Route.any('/*', ({ view }) => view.render('404'))