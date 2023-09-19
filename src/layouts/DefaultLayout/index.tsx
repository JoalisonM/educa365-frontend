import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'

export function DefaultLayout() {
  return (
    <div className="grid min-h-screen grid-cols-app antialiased">
      <Sidebar />
      <main className="px-4 pb-12 pt-8">
        <Outlet />
      </main>
    </div>
  )
}
