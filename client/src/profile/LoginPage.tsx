import React from "react"
import { getStrapiUser } from "../api/strapi-api"
import { UserContext } from "../context"

const LoginPage: React.FC = () => {
  const { setAuth } = React.useContext(UserContext)
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const AUTH_TOKEN = 'auth'

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const login = await getStrapiUser(username, password)
      if (login) {
        setAuth(login.data.jwt)
        window.localStorage.setItem(AUTH_TOKEN, login.data.jwt)
        console.log('login:')
        console.log(login)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const submitEnabled = !!username && !!password

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className='login-container'>
          <div className='login-input-container'>
            <h3 className='login-input-text'>Username</h3>
            <span>
              <input className='login-input'
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </span>
          </div>

          <div className='login-input-container'>
            <h3 className='login-input-text'>Password</h3>
            <span>
              <input className='login-input'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
          </div>
        </div>

        <div>
          <button
            type='submit'
            disabled={!submitEnabled || loading}
            style={{ marginTop: 18 }}
          >
            Login
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginPage
