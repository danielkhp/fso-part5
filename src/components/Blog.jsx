import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const isOwner = blog.user.id === user.id

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => setShowDetail(!showDetail)

  const like = async () => {
    const updatedBlog = await blogService.like(blog.id, { likes: likes + 1 })

    setLikes(updatedBlog.likes)
  }

  const removeBlog = () => {
    deleteBlog(blog.id)
  }

  const detailedInfo = () => (
    <>
      <p>{blog.url}</p>

      <p>
        likes: {likes}

        <button
          type='button'
          onClick={like}
        >
          like
        </button>
      </p>

      <p>{blog.user.name}</p>

      {isOwner &&
        <button
          type='button'
          onClick={removeBlog}
        >
          delete
        </button>}
    </>
  )

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} by {blog.author}

        <button
          type='button'
          onClick={toggleDetail}
        >
          {showDetail ? 'hide' : 'view'}
        </button>
      </p>

      {showDetail && detailedInfo()}
    </div>
  )
}

export default Blog
