/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import pauseIcon from "../../assets/icons/pause.svg"
import playIcon from "../../assets/icons/play.svg"

interface TracksProps {
  readonly album: any
}

const Tracks: React.FC<TracksProps> = ({ album }) => {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null)
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null)
  
  function msToMinSec(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
      
  
    
  const startAudio = (link: string) => {
    if (!audio) {
      const newAudio = new Audio()
      newAudio.src = link
      setAudio(newAudio)
    }
  }
  
  const stopAudio = () => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setAudio(null)
      clearInterval(intervalId!)
    }
  }
  
  useEffect(() => {
    if (audio) {
      try {
        audio.play()
        const newIntervalId = setInterval(updateProgressBar, 10)
        setIntervalId(newIntervalId)
        audio.addEventListener('ended', handleAudioEnded)
      } catch (err) {
        console.error(err)
      }
    }
    return () => {
      clearInterval(intervalId!)
    }
  }, [audio])
  
  const handleAudioEnded = () => {
    setAudio(null)
  }
  
  const updateProgressBar = () => {
    const progressBar = document.getElementById('progress-bar')
    if (audio && progressBar) {
      const progress = (audio.currentTime / audio.duration) * 100
      progressBar.style.width = `${progress}%`
    }
  }
    
  return (
    <div>
      {album.tracks.items.map((track: any) => (
        <div className='rating-track-container' key={track.id}>
          <h4 className='rating-track-name'>{track.name}</h4>
          <h4 className='rating-track-title'>({msToMinSec(track.duration_ms)})</h4>
    
          {track.preview_url && (audio && audio.src === track.preview_url ? (
            <div className='play-pause-container' onClick={stopAudio}>
              <img className='play-pause-icon' src={pauseIcon} alt='Pause' />
            </div>
          ) : (
            <div className='play-pause-container' onClick={() => startAudio(track.preview_url)}>
              <img className='play-pause-icon' src={playIcon} alt='Play' />
            </div>
          ))}

          {audio && audio.src === track.preview_url && (
            <div className='progress-bar-container'>
              <div id='progress-bar' className='progress-bar' style={{ width: '0%' }}></div>
            </div>
          )}

        </div>
      ))}
    </div>
  )
}
  
export default Tracks