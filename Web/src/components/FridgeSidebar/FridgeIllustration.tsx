import type { ReactNode } from 'react'
import fridgeImg from '../../assets/fridge.png'
import './FridgeSidebar.css'

type FridgeIllustrationProps = {
  children: ReactNode
}

export function FridgeIllustration({ children }: FridgeIllustrationProps) {
  return (
    <div className="fridge-scene">
      <img
        src={fridgeImg}
        alt=""
        className="fridge-scene__image"
        draggable={false}
      />
      <div className="fridge-scene__interior">{children}</div>
    </div>
  )
}
