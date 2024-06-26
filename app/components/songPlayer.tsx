import { useWindowSize } from "@uidotdev/usehooks"
import { Spotify } from "react-spotify-embed/Spotify"

import { useCallback, useEffect } from "react"
import styles from "./styles/songPlayer.module.scss"
import _ from "lodash"

const SONG_DELAY = 950 // ms before we play the song

type Props = {
  songURL: string
}

const SongPlayer = ({ songURL }: Props) => {
  const togglePlay = useCallback(
    _.debounce(() => {
      const spotifyEmbedWindow = document.querySelector(
        'iframe[src*="spotify.com/embed"]'
      ) as HTMLIFrameElement
      if (!spotifyEmbedWindow?.contentWindow) return
      spotifyEmbedWindow.contentWindow.postMessage({ command: "toggle" }, "*")
    }, SONG_DELAY * 0.75),
    []
  )

  useEffect(() => {
    setTimeout(() => {
      togglePlay()
    }, SONG_DELAY)
  }, [songURL])

  const browserSize = useWindowSize()
  const spotifyProps: React.ComponentProps<typeof Spotify> = {
    link: songURL,
    allow: "autoplay",
  }
  if (browserSize.width && browserSize.width < 768) {
    spotifyProps.height = "90px"
  }

  return (
    <div
      className={`${styles.songPlayer} pt-2 md:py-2 px-6 rounded-2xl md:mb-5 bg-default/10`}
    >
      <h2 className="md:text-xl text-center mb-2 md:mb-4" onClick={togglePlay}>
        Song
      </h2>
      <Spotify {...spotifyProps} />
    </div>
  )
}
export default SongPlayer
