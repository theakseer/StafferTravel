import { Outlet } from "react-router-dom"
import Header from "./components/Header"

const AppLayout = () => {
  return (
    <main>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center  bg-gray-800">Made by @akseerlabs</div>
    </main>
  )
}

export default AppLayout