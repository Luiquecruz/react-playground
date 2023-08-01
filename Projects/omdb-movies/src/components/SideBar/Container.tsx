import { PropsWithChildren } from 'react'
import SideBar from "./SideBar"

const Container = ({ children }: PropsWithChildren) => {
  return <SideBar>{children}</SideBar>
}

export default Container