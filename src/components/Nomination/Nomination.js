import styles from './Nomination.module.scss'

const Nomination = ({ title, year, removeNomination, id }) => {
  return (
    <div className={styles.nominationWrapper}>
      <span>{title}</span> &nbsp;
      <span>({year})</span>
      <button className={styles.removeButton} onClick={() => removeNomination(id)}>
        Remove
      </button>
    </div>
  )
}

export default Nomination
