import styles from './LoadingButton.module.scss'

const LoadingButton = ({ handleClick, loading }) => {
  return (
    <button className={`${styles.loadingButton}`} disabled={loading} onClick={handleClick}>
      <span className={`${loading && styles.spinner}`}></span> Load More
    </button>
  )
}

export default LoadingButton
