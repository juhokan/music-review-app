import React, { useEffect } from "react"
import logo from '../../assets/logos/hifi-logo.svg'
import { AppRoute } from "../../routes"
import { ProfileContext, SearchContext, UserContext } from "../../context"
import { StrapiProfile } from "../../strapi/model.strapi"
import { toStrapiUrl } from "../../strapi/util.strapi"
import { useLocation, useNavigate } from 'react-router-dom'
import searchIcon from "../../assets/icons/search.svg"


const Header: React.FC = () => {

  const { auth } = React.useContext(UserContext)
  const [id, setId] = React.useState<number>()
  const { profiles } = React.useContext(ProfileContext)
  const { setInput } = React.useContext(SearchContext)
  const [current, setCurrent] = React.useState<StrapiProfile | null>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [isMobile, setMobile] = React.useState(false)

  const MAX_WIDTH = 768

  const isSearchActive = () => {
    setMobile(window.innerWidth <= MAX_WIDTH)
  }

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }
  

  useEffect(() => {

    isSearchActive()
    window.addEventListener('resize', isSearchActive)
    
    if (profiles && auth) {
      setId(parseJwt(auth).id)
      Object.values(profiles).forEach((profile) => {
        if (profile.attributes.user_id === id) {
          setCurrent(profile)
          return
        }
      })
    }

    return () => {
      window.removeEventListener('resize', isSearchActive)
    }

  }, [auth, profiles, id])


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
        {isMobile ? (
          pathname !== AppRoute.Search && (
            <a href={AppRoute.Search}>
              <img src={searchIcon} height='16px' />
            </a>
          )
        ) : (
          <div className='search-container'>
            {pathname !== AppRoute.Search && (
              <form onSubmit={handleSubmit}>
                <input type='text' className='search-hover' />
              </form>
            )}
          </div>
        )}

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
        <a href={AppRoute.Profile}>
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