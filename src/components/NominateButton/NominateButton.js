import Confetti from 'react-dom-confetti'
import styles from './NominateButton.module.scss'

const config = {
  angle: 90,
  spread: 110,
  startVelocity: 25,
  elementCount: 70,
  dragFriction: 0.25,
  duration: 1000,
  stagger: 3,
  width: '8px',
  height: '8px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

const NominateButton = ({ year, title, id, nominate, nominated, disableNominate }) => {
  const handleNominate = (id) => {
    const movie = { [id]: { title, year, id } }
    nominate(movie)
  }

  return (
    <button
      onClick={() => handleNominate(id)}
      className={`${styles.nominateButton} `}
      disabled={nominated || disableNominate}
    >
      <span>{nominated ? 'Nominated' : 'Nominate'}</span>
      {nominated && (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M13.3164 2V4.66667M12 3.5H14.6667M4.00033 11.3333V14M2.66699 12.6667H5.33366M8.66699 2L10.191 6.57133L14.0003 8L10.191 9.42867L8.66699 14L7.14299 9.42867L3.33366 8L7.14299 6.57133L8.66699 2Z'
            stroke='#F28383'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
      <Confetti config={config} active={nominated} className={styles.confetti} />
    </button>
  )
}

export default NominateButton
