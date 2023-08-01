import { useRef, PropsWithChildren } from "react"
import { motion, AnimatePresence, useCycle } from "framer-motion"
import SideBarToggle from "./SideBarToggle"
import { SideBarWrapper, SideBarBackground, SideBarContent, SideBarHeader } from './style'

const SideBar = ({ children }: PropsWithChildren) => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)

  // sidebar variant
  const sidebar = {
    open: (height = 100) => ({
      clipPath: `circle(${height}vh at 260px 40px)`,
      boxShadow: '-4px 0 8px rgba(0, 0, 0, 0.15)',
      transition: {
        type: "spring",
        stiffness: 50,
        restDelta: 1
      }
    }),
    closed: {
      clipPath: "circle(30px at 260px 40px)",
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      transition: {
        delay: .1,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }

  return (
    <SideBarWrapper
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
    >
      <SideBarBackground variants={sidebar} />

      <SideBarHeader>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Favorites
            </motion.h4>)}
        </AnimatePresence>

        <SideBarToggle toggle={() => toggleOpen()} />
      </SideBarHeader>

      <SideBarContent>
        <AnimatePresence initial={false}>
          {isOpen ? children : null}
        </AnimatePresence>
      </SideBarContent>
    </SideBarWrapper>
  )
}

export default SideBar