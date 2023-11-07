const LoginForm = ({ onSubmit, username, password, setUsername, setPassword }) => (
  <>
    <h2>Log in to application</h2>
    <form onSubmit={onSubmit}>
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
  </>
)

export default LoginForm
