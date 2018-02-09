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
    Route.get('users', 'UserController.getAll')
    //Route.get('user/authenticated', 'UserController.getAuthenticadedUser')
    Route.get('users/:idOrUsername', 'UserController.getOne')
    Route.get('users/:idOrUsername/posts', 'UserController.getRelatedPosts')
    Route.get('users/:idOrUsername/likes', 'UserController.getRelatedLikes')
    Route.post('users', 'UserController.store')
    Route.put('users/:idOrUsername', 'UserController.update')
    Route.put('users/:idOrUsername', 'UserController.delete')

    //POSTS
    Route.get('posts', 'PostController.getAll')
    Route.get('posts/:idOrSlug', 'PostController.getOne')
    Route.get('posts/:idOrSlug/users', 'PostController.getRelatedUsers')
    Route.get('posts/:idOrSlug/likes', 'PostController.getRelatedLikes')
    Route.get('posts/:idOrSlug/tags', 'PostController.getRelatedTags')
    Route.post('posts', 'PostController.store')
    Route.put('posts/:id', 'PostController.update')
    Route.delete('posts/:idOrSlug', 'PostController.delete')
    Route.delete('posts/:idOrSlug/tags/:id', 'PostController.deleteRelatedTags')
    
    //CATEGORIES
    Route.get('categories', 'CategoriesController.getAll')
    Route.get('categories/:idOrName', 'CategoriesController.getOne')
    Route.get('categories/:idOrName/posts', 'CategoriesController.getRelatedPosts')
    Route.post('categories', 'CategoriesController.store')
    Route.put('categories/:idOrName', 'CategoriesController.update')
    Route.delete('categories/:idOrName', 'CategoriesController.delete')
    
    //TAGS
    Route.get('tags', 'TagsController.getAll')
    Route.get('tags/:idOrName', 'TagsController.getOne')
    Route.get('tags/:idOrName/posts', 'TagsController.getRelatedPosts')
    Route.delete('tags/:idOrName', 'TagsController.delete')

    //LIKES
    Route.post('likes', 'TagsController.store')
    Route.delete('likes/:id', 'TagsController.delete')

}).prefix('api/v1')

//Route.any('/*', ({ view }) => view.render('404'))