import React from "react"
import { useNavigate } from 'react-router-dom'
import { AppRoute } from "../../routes"
import { CLIENT_ID, CLIENT_SECRET } from "../../config"
import axios from "axios"

const CallbackPage: React.FC = () => {
  const [code, setCode] = React.useState("")
  const [state, setState] = React.useState("")
  const navigate = useNavigate()

  const initAuthCheck = async () => {
    if (state === null) {
      navigate(AppRoute.Home)
      console.error('state_mismatch')
    } else {
      if (code) { 
  
        const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        const authData = new URLSearchParams({
          code: code,
          redirect_uri: 'https://hifi-app.fly.dev/callback',
          grant_type: 'authorization_code'
        }).toString()
  
        const authOptions = {
          method: 'POST',
          url: 'https://accounts.spotify.com/api/token',
          data: authData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader
          },
          mode: 'cors'
        }
  
        try {
          const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers })
          //Response with refresh token
          console.log(response)
          if (response.status === 200) {
            const { access_token, refresh_token, expires_in } = response.data
  
            navigate('/#' + new URLSearchParams({
              access_token: access_token,
              refresh_token: refresh_token,
              expires_in: expires_in
            }))
          } else {
            navigate('/#' + new URLSearchParams({ error: 'invalid_token' }))
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        console.log('no code')
      }
    }
  }
  

  React.useEffect(() => {
    const ref = window.location.href.split('/')[3].split('?')[1].split('&')
    const codeRef = ref[0].split('=')[1]
    const stateRef = ref[1].split('=')[1]
    console.log(codeRef)
    setCode(codeRef)
    setState(stateRef)
    initAuthCheck()
  }, [code, state])

  return (
    <div>
      <h3>Loading...</h3>
    </div>
  )
}

export default CallbackPage