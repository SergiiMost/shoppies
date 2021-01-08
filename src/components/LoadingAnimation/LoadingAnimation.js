import styles from './LoadingAnimation.module.scss'

export default function LoadingAnimation() {
  return (
    <div className={styles.pulseContainer}>
      <div className={`${styles.pulseBubble} ${styles.pulseBubble1} `}></div>
      <div className={`${styles.pulseBubble} ${styles.pulseBubble2} `}></div>
      <div className={`${styles.pulseBubble} ${styles.pulseBubble3} `}></div>
    </div>
  )
}
