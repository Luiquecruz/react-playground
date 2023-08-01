import styled from 'styled-components'
import { motion } from "framer-motion"

export const ToggleButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 18px;
  right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
 `

export const SideBarWrapper = styled(motion.aside)`
  position: fixed;
  z-index: 1009;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
`

export const SideBarBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background: #efefef;
`

export const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: 75px;

  h4 {
    color: #121212;
    position: relative;
    z-index: 2;
    margin: 0;
  }
`

export const SideBarContent = styled(motion.div)`
  margin: 0;
  padding: 0 20px 20px;
  position: absolute;
  top: 75px;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh -  75px);
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`