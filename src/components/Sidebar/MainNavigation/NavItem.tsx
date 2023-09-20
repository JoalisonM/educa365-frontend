import { ElementType } from 'react'
import { Link } from 'react-router-dom'

interface NavItemProps {
  to: string
  title: string
  icon: ElementType
}

export const NavItem = (props: NavItemProps) => {
  const { to, icon: Icon, title } = props
  return (
    <Link
      to={to}
      className="group flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-yellow-50"
    >
      <div className="bg-gray600 p-2 rounded-md group-hover:bg-selectiveYellow">
        <Icon className="h-5 w-5 text-white group-hover:text-gray600" />
      </div>
      <span className="font-medium text-white group-hover:text-gray600">
        {title}
      </span>
    </Link>
  )
}
