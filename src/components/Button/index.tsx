import { ComponentProps } from 'react'

type ButtonPrefixProps = ComponentProps<'div'>

export const ButtonPrefix = (props: ButtonPrefixProps) => {
  return <div {...props} />
}

type ButtonControlProps = ComponentProps<'button'>

export const ButtonControl = (props: ButtonControlProps) => {
  return (
    <button
      className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600"
      {...props}
    />
  )
}

type ButtonRootProps = ComponentProps<'div'>

export const ButtonRoot = (props: ButtonRootProps) => {
  return (
    <div
      className="mx-1 flex w-full items-center gap-2 rounded-lg border border-gray-400 px-3 py-2 shadow-sm"
      {...props}
    />
  )
}
