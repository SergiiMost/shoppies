import styles from './Footer.module.scss'
import { BiCopyright } from 'react-icons/bi'
import { BsHeartFill } from 'react-icons/bs'

const Footer = () => {
  const date = new Date()
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContentWrapper}>
        <div className={styles.copyrightWrapper}>
          <BiCopyright />
          <span>The Shoppies, {date.getFullYear()} </span>
        </div>
        <p>
          Created with <BsHeartFill color='#F44336' size='14px' /> by&nbsp;
          <a
            href='https://www.linkedin.com/in/sergii-mostovyi/'
            target='_blank'
            rel='noreferrer'
            className={styles.footerLink}
          >
            Sergii Mostovyi
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
