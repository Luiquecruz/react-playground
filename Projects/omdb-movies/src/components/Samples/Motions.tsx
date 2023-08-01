import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Motions = () => {
  const [isActive, setActive] = useState(false)
  const [selectedId, setSelectedId] = useState<ReactNode>(null)

  interface Item {
    id: string
    title: string
    subtitle: string
  }

  const items: Item[] = [
    {
      id: '1',
      title: 'Sample title',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, explicabo laudantium alias, amet recusandae ullam molestiae quam aliquid aliquam repudiandae necessitatibus dicta atque eos, pariatur odit consectetur dolorem vel nobis.',
    },
    {
      id: '2',
      title: 'Sample title',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, explicabo laudantium alias, amet recusandae ullam molestiae quam aliquid aliquam repudiandae necessitatibus dicta atque eos, pariatur odit consectetur dolorem vel nobis.',
    },
    {
      id: '3',
      title: 'Sample title',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, explicabo laudantium alias, amet recusandae ullam molestiae quam aliquid aliquam repudiandae necessitatibus dicta atque eos, pariatur odit consectetur dolorem vel nobis.',
    }
  ]

  // variants for list sample
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const listItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  useEffect(() => {
    console.log(selectedId)
  }, [selectedId])

  return (<>
    {/* animated list */}
    <motion.ul
      style={{
        width: '150px',
        height: '150px',
        display: 'grid',
        overflow: 'hidden',
        margin: 0,
        listStyle: 'none',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '15px',
        padding: '15px',
        background: '#ededed',
        borderRadius: '50px',
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {[0, 1, 2, 3].map((index) => (
        <motion.li
          key={index}
          variants={listItem}
          style={{ background: 'white', borderRadius: '100%' }}
        />
      ))}
    </motion.ul >

    {/* expandable card lv 1  */}
    <motion.div
      layout
      transition={{
        duration: .5,
        type: 'spring'
      }}
      style={{ padding: '1rem', background: '#ededed', maxWidth: '400px', borderRadius: '6px' }}
      onClick={() => setActive(!isActive)}
    >
      <motion.h2 layout="position">Framer motion sample</motion.h2>

      <AnimatePresence initial={false} mode={'sync'}>
        {isActive && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .25 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea commodi,
            eum porro maxime nisi eveniet! Aliquam, temporibus doloribus consequuntur sit delectus tempora!
            Quas, voluptatibus accusamus?
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>

    {/* expandable card lv 99 */}
    {items.map((item: Item) => (
      <motion.div
        style={{
          padding: '1rem',
          background: '#ededed',
          maxWidth: '400px',
          borderRadius: '6px',
          margin: '1rem 0'
        }}
        key={item.id}
        layoutId={item.id}
        onClick={() => setSelectedId(item.id)}
      >
        <motion.h5>{item.subtitle}</motion.h5>
        <motion.h2>{item.title}</motion.h2>
      </motion.div>
    ))}

    <AnimatePresence>
      {selectedId && (
        <motion.div
          layoutId={selectedId.toString()}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.h2>Title</motion.h2>
          <motion.h5>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, explicabo laudantium alias, amet recusandae ullam molestiae quam aliquid aliquam repudiandae necessitatibus dicta atque eos, pariatur odit consectetur dolorem vel nobis.
          </motion.h5>
          <motion.button layout="position" onClick={() => setSelectedId(null)}>
            Close
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  </>)
}

export default Motions