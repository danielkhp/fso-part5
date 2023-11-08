import { useState, useEffect } from 'react'
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

    setBlogs(blogs.concat(createdBlog))
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

      <Togglable buttonText='new blog'>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
