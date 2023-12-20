/**
 * This card used to display a senator is re-used throughout the app. It can optionally be made selectable.
 * This card fills its container, allowing for it to be used in responsive layouts
 */

import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import styles from './senator.module.scss'

type Props = {
  senator_id: string,
  showName?: boolean,
  showBirthYear?: boolean,
  selectable?: boolean
}

const Senator = ({
  senator_id,
  showName = true,
  showBirthYear = false,
  selectable = true
}: Props) => {
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
  }, [dispatch])
  return (<div className={styles.Senator}>

  </div>)
}
export default Senator
