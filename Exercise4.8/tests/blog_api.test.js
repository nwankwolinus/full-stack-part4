const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/note')

const api = supertest(app)

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
  
  afterAll(async () => {
    await mongoose.connection.close()
  })