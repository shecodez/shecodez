interface PagePetChatboxProps {
  showInput?: boolean
}

export function PagePetChatbox({ showInput }: PagePetChatboxProps) {
  if (!showInput) return null

  return (
    <div>
      <input className="w-full rounded-lg border border-input bg-background p-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </div>
  )
}
