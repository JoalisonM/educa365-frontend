import { FileSearch } from '@phosphor-icons/react'
import { InputControl, InputPrefix, InputRoot } from '../Input'
import { MainNavigation } from './MainNavigation'
import { Profile } from './Profile'

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-8 px-5 p-8 bg-gray700">
      <strong className="px-3 text-2xl font-semibold text-white">
        Educa365
      </strong>

      {/* <InputRoot>
        <InputPrefix>
          <FileSearch className="h-5 w-5 text-zinc-500" />
        </InputPrefix>
        <InputControl placeholder="Search" />
      </InputRoot> */}

      <MainNavigation />

      <div className="mt-auto px-3 space-y-6">
        <div className="h-px bg-gray-400" />
        <Profile />
      </div>
    </aside>
  )
}
