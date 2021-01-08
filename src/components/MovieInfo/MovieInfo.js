import styles from './MovieInfo.module.scss'
import { MdClose } from 'react-icons/md'

const MovieInfo = ({ info, loading }) => {
  return (
    <div className={styles.infoWrapper}>
      <MdClose className={styles.closeIcon} />
      <p>
        <span>Title:</span>
        {loading ? <span className={styles.spinner}></span> : info.Title}
      </p>
      <p>
        <span>Year:</span>
        {loading ? <span className={styles.spinner}></span> : info.Year}
      </p>
      <p>
        <span>Rated:</span>
        {loading ? <span className={styles.spinner}></span> : info.Rated}
      </p>
      <p>
        <span>Released:</span>
        {loading ? <span className={styles.spinner}></span> : info.Released}
      </p>
      <p>
        <span>Genre:</span>
        {loading ? <span className={styles.spinner}></span> : info.Genre}
      </p>
      <p>
        <span>Director:</span>
        {loading ? <span className={styles.spinner}></span> : info.Director}
      </p>
      <p>
        <span>IMDB rating:</span>
        {loading ? <span className={styles.spinner}></span> : info.imdbRating}
      </p>
      <p>
        <span>Plot:</span>
        {loading ? <span className={styles.spinner}></span> : info.Plot}
      </p>
    </div>
  )
}

export default MovieInfo
