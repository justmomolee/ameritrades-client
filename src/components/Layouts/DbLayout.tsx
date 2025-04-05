import { Outlet } from "react-router-dom"
import SideNav from "../SideNav"
import { contextData } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function DbLayout() {
  const { user } = contextData()
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) return navigate('/login')

    if(user && user.fullName === '') return navigate('/dashboard/updateProfile')
  }, [])

  return (user &&
    <div className="dark:bg-gray-700">
      <SideNav />
      <main className="p-4 sm:ml-64 pt-20">
        <Outlet />
      </main>
    </div>
  )
}
