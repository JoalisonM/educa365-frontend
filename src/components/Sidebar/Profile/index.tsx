import { SignOut } from '@phosphor-icons/react'
import { Button } from '../../Button'

export const Profile = () => {
  return (
    <div className="grid grid-cols-profile items-center gap-3">
      <div className="flex items-center p-1 border-b-2 border-r-2 rounded-full">
        <img
          src="https://github.com/JoalisonM.png"
          alt=""
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex flex-col truncate">
        <span className="text-white text-sm">Joalison Matheus</span>
        <small className="truncate text-sm text-gray-400">Coordenador</small>
      </div>
      <Button type="button" variant="ghost">
        <SignOut className="h-5 w-5 text-gray-400" />
      </Button>
    </div>
  )
}
