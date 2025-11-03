'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
  isPlaying: boolean
}

export default function AudioVisualizer({ audioRef, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const [bars, setBars] = useState<number[]>(new Array(32).fill(0))

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const initAudioContext = async () => {
      try {
        // Create audio context
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

        // Create analyser
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.8

        // Connect audio source to analyser
        const source = audioContext.createMediaElementSource(audio)
        source.connect(analyser)
        analyser.connect(audioContext.destination)

        analyserRef.current = analyser
        const bufferLength = analyser.frequencyBinCount
        dataArrayRef.current = new Uint8Array(bufferLength)

        // Start visualization
        const draw = () => {
          if (!analyserRef.current || !dataArrayRef.current) return

          analyserRef.current.getByteFrequencyData(dataArrayRef.current as any)

          // Process frequency data into bars
          const newBars: number[] = []
          const data = dataArrayRef.current
          const barCount = 32

          for (let i = 0; i < barCount; i++) {
            // Average frequency data for each bar
            const start = Math.floor((i / barCount) * data.length)
            const end = Math.floor(((i + 1) / barCount) * data.length)
            let sum = 0
            for (let j = start; j < end; j++) {
              sum += data[j]
            }
            const average = sum / (end - start)
            newBars.push(average / 255) // Normalize to 0-1
          }

          setBars(newBars)
          animationRef.current = requestAnimationFrame(draw)
        }

        draw()
      } catch (error) {
        console.error('Error initializing audio visualizer:', error)
      }
    }

    initAudioContext()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioRef, isPlaying])

  return (
    <div className="flex items-end justify-center space-x-1 h-20 mb-4">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-gradient-to-t from-purple-400 to-blue-400 rounded-t-sm transition-all duration-75 ease-out"
          style={{
            width: '6px',
            height: `${Math.max(height * 100, 2)}%`,
            opacity: isPlaying ? 0.8 + (height * 0.2) : 0.3,
            boxShadow: isPlaying ? `0 0 ${height * 10}px rgba(147, 51, 234, 0.5)` : 'none'
          }}
        />
      ))}
    </div>
  )
}
