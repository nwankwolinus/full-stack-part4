const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

// running filter: npm test -- -t "http"
// added test_helper to init the blogs 
beforeEach(async () => {
  await Blog.deleteMany({})

  const BlogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = BlogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)

describe('HTTP GET /api/blogs ', () => {
  test('http application returns the correct amount of blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('HTTP id  ', () => {
  test('http unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

  afterAll(async () => {
    await mongoose.connection.close()
  })