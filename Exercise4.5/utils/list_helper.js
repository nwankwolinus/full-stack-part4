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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}