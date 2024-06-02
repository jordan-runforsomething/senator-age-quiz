/**
 * This card used to display a senator is re-used throughout the app. It can optionally be made selectable.
 * This card fills its container, allowing for it to be used in responsive layouts
 */
"use client"
import React, { useEffect, useState } from "react"
import { SenatorData } from "../lib/loadData"
import { Image } from "@nextui-org/image"
import _ from "lodash"

import styles from "./styles/senator.module.scss"

type Props = {
  senator: SenatorData
  showName?: boolean
  showBirthYear?: boolean
  selectable?: boolean
}

const Senator = ({
  senator,
  showName = true,
  showBirthYear = false,
  selectable = true,
}: Props) => {
  const [selected, setSelected] = useState(false)
  return (
    <div className={styles.senatorCard}>
      <Image
        alt={`${senator.first_name} ${senator.last_name}`}
        className="object-cover rounded-xl"
        src={senator.image_url}
        width={200}
        height={200}
        isZoomed
      />
    </div>
  )
}
export default Senator
