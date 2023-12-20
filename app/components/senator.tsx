import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import styles from './senator.module.scss'

type Props = {}

const Senator = ({}: Props) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useReduxDispatch()

  const {} = useSelector((state: RootState) => {
    return {}
  }, shallowEqual)

  useEffect(() => {
    setLoading(true)
  }, [dispatch])
  return <div className={styles.Senator} />
}
export default Senator
