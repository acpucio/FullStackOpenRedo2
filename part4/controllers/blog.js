const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',(request, response) => {
  Blog.find({}).then(notes => {
    response.json(notes)
  })
})

blogsRouter.get('/:id',(request, response, next) => {
  Blog.findById(request.params.id)
  .then(note => {
    if(note){
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save()
  .then(savedBlog => {
    response.json(savedBlog)
  })
  .catch(error => next(error))
})

module.exports = blogsRouter