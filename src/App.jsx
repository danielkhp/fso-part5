import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [fetchingUser, setFetchingUser] = useState(true)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem('blogAppUser')

    if (storedUserJSON) {
      const user = JSON.parse(storedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    setFetchingUser(false)
  }, [])

  useEffect(() => {
    (async () => {
      const fetchedBlogs = await blogService.getAll()

      setBlogs(fetchedBlogs)
    })()
  }, [])

  const login = async (user) => {
    try {
      const loggedInUser = await loginService.login(user)

      window.localStorage.setItem('blogAppUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)

      setUser(loggedInUser)
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogAppUser')
  }

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog)

    blogFormRef.current.toggleVis()

    setBlogs(blogs.concat(createdBlog))
  }

  // const updateBlog = async (id, updateObj) => {
  //   const updatedBlog = await blogService.like(id, updateObj)

  //   setBlogs(blogs.map((blog) => (
  //     blog.id === updatedBlog.id
  //       ? updatedBlog
  //       : blog
  //   )))
  // }

  const deleteBlog = async (id) => {
    await blogService.remove(id)

    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  if (fetchingUser) return null

  if (user === null) return (
    <div>
      <LoginForm login={login} />
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>

      {user.name} logged in
      <button onClick={handleLogout}>logout</button>

      <h2>add blog</h2>

      <Togglable
        showText='new blog'
        hideText='cancel'
        ref={blogFormRef}
      >
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App
