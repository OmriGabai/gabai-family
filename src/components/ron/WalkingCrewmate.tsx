'use client'

import styles from './WalkingCrewmate.module.css'

interface WalkingCrewmateProps {
  top: string
  direction: 'left' | 'right'
  speed: number // seconds to cross screen
  delay: number // animation delay in seconds
  hue?: number // color rotation in degrees (0-360)
}

export function WalkingCrewmate({ top, direction, speed, delay, hue = 0 }: WalkingCrewmateProps) {
  const walkClass = direction === 'right' ? styles.walkRight : styles.walkLeft

  return (
    <div
      className={`${styles.crewmate} ${walkClass}`}
      style={{
        top,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
        filter: hue !== 0 ? `hue-rotate(${hue}deg)` : undefined,
      }}
    >
      <div className={styles.sprite} />
    </div>
  )
}
