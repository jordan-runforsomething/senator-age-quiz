import styles from './componentStyles.module.scss'

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <h1 className="text-3xl font-bold underline">Welcome!</h1>
    </div>
  )
}