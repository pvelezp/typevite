import { BuyMeACoffeeButton } from '../buyme-button';
import styles from './styles.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
       <strong>Made by{' '} 
        <a
        rel='noopener noreferrer'
        target="_blank"
        href="https://www.linkedin.com/in/pablovelezcoder">
        Pablo Vélez
        </a>
       </strong>
       <BuyMeACoffeeButton />
    </footer>
  )
}
