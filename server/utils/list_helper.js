const dummy = (blogs) => {

  return 1
}

const totalLikes = (blogs) =>{
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)

}
  



const favouriteBlog = (blogs) =>{
  let max = 0
  let len = blogs.length
  let index
  while(len--) {
    if (blogs[len].likes > max) {
      max = blogs[len].likes
      index = len
    }
  }
  return {
    'title': blogs[index].title,
    'author': blogs[index].author,
    'likes': blogs[index].likes

  }
}

const mostBlogs = (blogs) => {
  let blogCounts = []
  
  let indexOfMostBlogs
  const len = blogs.length
  for (i=0; i<len; i++) {
    let authors = blogCounts.map(item=> item.author)
    const index = authors.indexOf(blogs[i].author)
    if (index == -1) {
      blogCounts.push({author: blogs[i].author, blogs: 1})
    } else {
      blogCounts[index].blogs ++
      console.log(blogCounts[index])
    }
    let len2 = blogCounts.length
    let mostCount = 0
  
    while(len2--) {
      if(blogCounts[len2].blogs>mostCount) {
        mostCount = blogCounts[len2].blogs
        indexOfMostBlogs = len2
      }

    }
  }
  console.log(blogCounts)
  return blogCounts[indexOfMostBlogs]
}

const mostLikes = (blogs) => {
  let blogCounts = []
  
  let indexOfMostBlogs
  const len = blogs.length
  for (i=0; i<len; i++) {
    let authors = blogCounts.map(item=> item.author)
    const index = authors.indexOf(blogs[i].author)
    if (index == -1) {
      blogCounts.push({author: blogs[i].author, likes: blogs[i].likes})
    } else {
      blogCounts[index].likes += blogs[i].likes
      console.log(blogCounts[index])
    }
    let len2 = blogCounts.length
    let mostLikes = 0
  
    while(len2--) {
      if(blogCounts[len2].likes>mostLikes) {
        mostLikes = blogCounts[len2].likes
        indexOfMostBlogs = len2
      }

    }
  }
  console.log(blogCounts)
  return blogCounts[indexOfMostBlogs]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}