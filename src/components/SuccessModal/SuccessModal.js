import styles from './SuccessModal.module.scss'
import Confetti from 'react-dom-confetti'
import { useEffect, useState } from 'react'
import { BsHeartFill } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

const config = {
  angle: 90,
  spread: 110,
  startVelocity: 35,
  elementCount: 70,
  dragFriction: 0.25,
  duration: 1500,
  stagger: 3,
  width: '8px',
  height: '8px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

const SuccessModal = ({ numberOfNominations }) => {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => {
      setActive(true)
    }, 100)
    return () => clearTimeout(id)
  })

  return (
    <div className={styles.modalWrapper}>
      <span className='mb-1'>
        {numberOfNominations} / {numberOfNominations} movies were nominated.
      </span>
      <span>
        Thank you <BsHeartFill color='#F44336' size='12px' /> !
      </span>
      <MdClose className={styles.closeIcon} />
      <Confetti config={config} active={active} className={styles.confetti} />
    </div>
  )
}

export default SuccessModal
