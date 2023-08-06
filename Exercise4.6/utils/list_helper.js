const dummy = (blogs) => {
  return blogs.length === 0
    ? 0
    : 1 
}

const totalLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  }
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  const reducer = (mostLiked, blog) => {
    return (mostLiked.likes > blog.likes) ? mostLiked : blog
  }
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const map = new Map()

  blogs.map(blog => map.set(blog.author, (map.has(blog.author)) ? map.get(blog.author) + 1 : 1 ))

  let mostBlogs = {
    'author': '',
    'blogs' : 0
  }

  for (let [author, blogs] of map){
    if(mostBlogs.blogs < blogs){
      mostBlogs = {
        'author': author,
        'blogs' : blogs
      }
    }
  }
  return mostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}