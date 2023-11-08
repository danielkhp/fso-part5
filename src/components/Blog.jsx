import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => setShowDetail(!showDetail)

  const detailedInfo = () => (
    <>
      <p>{blog.url}</p>
      <p>likes: {blog.likes}</p>
      <p>{blog.user.name}</p>
    </>
  )

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button
        type='button'
        onClick={toggleDetail}
      >
        {showDetail ? 'hide' : 'view'}
      </button>

      {showDetail && detailedInfo()}
    </div>
  )
}

export default Blog
