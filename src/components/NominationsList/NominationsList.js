import Nomination from '../Nomination/Nomination'
import styles from './NominationsList.module.scss'

const NominationsList = ({ nominated, removeNomination }) => {
  return (
    <div className={styles.nominationsWrapper}>
      <p className={styles.nominationsHeader}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          fill='currentColor'
          className='bi bi-camera-reels'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8zm11.5 5.175l3.5 1.556V7.269l-3.5 1.556v4.35zM2 7a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2z'
          />
          <path fillRule='evenodd' d='M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
          <path fillRule='evenodd' d='M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
        </svg>
        <span> Nominations: {Object.keys(nominated).length}/5</span>
      </p>
      <ol className={styles.nominatedList}>
        {Object.keys(nominated).map((key) => {
          return (
            <li key={nominated[key].id}>
              <Nomination
                title={nominated[key].title}
                year={nominated[key].year}
                id={nominated[key].id}
                removeNomination={removeNomination}
              />
            </li>
          )
          //<p>{nominated[key].year}</p>
        })}
      </ol>
    </div>
  )
}

export default NominationsList
