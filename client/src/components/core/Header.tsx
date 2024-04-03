import React, { useEffect } from "react"
import logo from '../../assets/logos/hifi-logo.svg'
import { AppRoute } from "../../routes"
import { ProfileContext, SearchContext, UserContext } from "../../context"
import { StrapiProfile } from "../../strapi/model.strapi"
import { toStrapiUrl } from "../../strapi/util.strapi"
import { useLocation, useNavigate } from 'react-router-dom'


const Header: React.FC = () => {

  const { auth } = React.useContext(UserContext)
  const { profiles } = React.useContext(ProfileContext)
  const { setInput } = React.useContext(SearchContext)
  const [current, setCurrent] = React.useState<StrapiProfile | null>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  

  useEffect(() => {
    
    if (profiles && auth) {
      Object.values(profiles).forEach((profile) => {
        if (profile.attributes.user_id === auth.user.id) {
          setCurrent(profile)
          return // exit loop early once a matching profile is found
        }
      })
    }
  }, [auth, profiles])


  const headerImage = () => {
    return (
      <a href={AppRoute.Home} className='header-image'>
        <img src={logo} height='48px' />
      </a>
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const i = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('input[type="text"]')?.value
    if (i) {
      setInput(i)
      navigate(AppRoute.Search)
    }
  }
  
  const headerLinks = () => {
    return (
      <div className='header-link-container'>
        <div className='search-container'>
          {pathname !== AppRoute.Search && <form onSubmit={handleSubmit}>
            <input type='text' className='search-hover' />
          </form>}
        </div>
        {pathname !== AppRoute.Profile && profileLink()}
      </div>
    )
  }

  const profileLink = () => {
    return (
      auth ? (
        <a className='header-profile-link' href={AppRoute.Profile}>
          { current && current.attributes.profile_image.data && (
            <img 
              className='header-profile-image'
              src={toStrapiUrl(current.attributes.profile_image.data.attributes.url)}
            />
          )}
        </a>
      ) : (
        <a href='http://localhost:1337/api/connect/google/'>
          <h3>Log In</h3>
        </a>
      )
    )
  }
 
  return (
    <div className='header'>
      {headerImage()}
      {headerLinks()}
    </div>
  )
}

export default Header