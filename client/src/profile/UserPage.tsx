import React from "react"
import { UserContext } from "../context"

const UserPage: React.FC = () => {
  const { auth } = React.useContext(UserContext)


  return (
    <div>
      <h2>User Page</h2>
      <h3>{auth.user.id}</h3>
    </div>
  )
}

export default UserPage