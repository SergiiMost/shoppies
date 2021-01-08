import styles from './Overlay.module.scss'

const Overlay = ({ children, handleOverlayClick }) => {
  return (
    <div
      className={styles.overlay}
      style={{ top: `${window.scrollY}px` }}
      onClick={() => {
        handleOverlayClick()
      }}
    >
      {children}
    </div>
  )
}

export default Overlay
