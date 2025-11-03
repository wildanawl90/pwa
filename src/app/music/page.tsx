'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import AudioVisualizer from '@/components/AudioVisualizer'

interface Track {
  name: string
  file: File | null
  url: string | null
}

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newTracks: Track[] = []
      Array.from(files).forEach(file => {
        if (file.type.startsWith('audio/')) {
          const url = URL.createObjectURL(file)
          newTracks.push({
            name: file.name,
            file: file,
            url: url
          })
        }
      })
      setTracks(prev => [...prev, ...newTracks])
    }
  }

  const playTrack = (index: number) => {
    if (currentTrack === index && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      setCurrentTrack(index)
      setIsPlaying(true)
    }
  }

  const nextTrack = () => {
    if (currentTrack !== null && tracks.length > 0) {
      const nextIndex = (currentTrack + 1) % tracks.length
      setCurrentTrack(nextIndex)
      setIsPlaying(true)
    }
  }

  const prevTrack = () => {
    if (currentTrack !== null && tracks.length > 0) {
      const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1
      setCurrentTrack(prevIndex)
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current && !isDragging) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleProgressMouseDown = () => {
    setIsDragging(true)
  }

  const handleProgressMouseUp = () => {
    setIsDragging(false)
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime)
      }
    }

    const handleEnded = () => {
      nextTrack()
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, isDragging])

  useEffect(() => {
    if (currentTrack !== null && tracks[currentTrack]?.url) {
      const audio = audioRef.current
      if (audio) {
        audio.src = tracks[currentTrack].url!
        audio.volume = volume
        if (isPlaying) {
          audio.play()
        }
      }
    }
  }, [currentTrack, tracks, volume])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
        >
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            🎵 Music Player
          </h1>

          {/* File Upload */}
          <div className="mb-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              📁 Pilih Lagu dari Device
            </button>
          </div>

          {/* Track List */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Playlist</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tracks.map((track, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    currentTrack === index
                      ? 'bg-purple-600/50 border-2 border-purple-400'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => playTrack(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentTrack === index && isPlaying
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-gray-600'
                      }`}>
                        {currentTrack === index && isPlaying ? '🎵' : '▶️'}
                      </div>
                      <span className="text-white font-medium truncate">
                        {track.name}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setTracks(prev => prev.filter((_, i) => i !== index))
                        if (currentTrack === index) {
                          setCurrentTrack(null)
                          setIsPlaying(false)
                        }
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </motion.div>
              ))}
              {tracks.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  Belum ada lagu. Klik tombol di atas untuk menambah lagu!
                </div>
              )}
            </div>
          </div>

          {/* Player Controls */}
          {currentTrack !== null && tracks[currentTrack] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/20 rounded-xl p-6"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-white truncate">
                  {tracks[currentTrack].name}
                </h3>
              </div>

              {/* Audio Visualizer */}
              <AudioVisualizer audioRef={audioRef} isPlaying={isPlaying} />

              {/* Progress Bar */}
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleProgressChange}
                  onMouseDown={handleProgressMouseDown}
                  onMouseUp={handleProgressMouseUp}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <button
                  onClick={prevTrack}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  ⏮️
                </button>
                <button
                  onClick={() => playTrack(currentTrack)}
                  className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button
                  onClick={nextTrack}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  ⏭️
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-4">
                <span className="text-white">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-white text-sm">{Math.round(volume * 100)}%</span>
              </div>
            </motion.div>
          )}

          <audio ref={audioRef} />
        </motion.div>
      </div>
    </div>
  )
}
