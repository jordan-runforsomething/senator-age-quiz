
import Image from 'next/image'
import styles from './page.module.css'
import Welcome from './components/welcome'
import { useState } from 'react'
import Header from './components/header'
import Link from 'next/link'

const orderedPages = [Welcome]

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.center}>
        <Welcome />
        <Link href='/quizz'>Open the Quizz!</Link>
      </div>
    </main>
  )
}
