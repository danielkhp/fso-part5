import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username,
      password,
    }

    login(user)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password:
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
