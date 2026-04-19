'use client'

import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import { Header } from '@/components/UI/Header'
import { ChannelsPanel } from '@/components/UI/ChannelsPanel'
import { VideoPlayer } from '@/components/UI/VideoPlayer'
import { ZoomControls } from '@/components/UI/ZoomControls'
import { Instructions } from '@/components/UI/Instructions'
import { SideMenu } from '@/components/UI/SideMenu'
import { BuyMeCoffeeButton } from '@/components/UI/BuyMeCoffeeButton'
import { AffiliateButtons } from '@/components/UI/AffiliateButtons'
import { Country, Channel } from '@/data/countries'
import type { SceneHandle } from '@/components/Globe/Scene'

// Three.js is browser-only — dynamic import with no SSR
const Scene = dynamic(
  () => import('@/components/Globe/Scene').then(m => m.Scene),
  { ssr: false, loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border-2 border-primary/30 animate-pulse" />
    </div>
  )}
)

interface HomeClientProps {
  lang: string
}

export function HomeClient({ lang }: HomeClientProps) {
  const { t } = useTranslation()
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [playingChannel, setPlayingChannel] = useState<Channel | null>(null)
  const sceneRef = useRef<SceneHandle>(null)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(var(--space-dark))]" />

      {/* 3D Globe */}
      <div className="absolute inset-0">
        <Scene
          ref={sceneRef}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
      </div>

      {/* UI Overlays */}
      <SideMenu />
      <Header onPlayChannel={setPlayingChannel} />

      <ChannelsPanel
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
        onPlayChannel={setPlayingChannel}
      />

      <AffiliateButtons />
      <BuyMeCoffeeButton />

      <ZoomControls
        onZoomIn={() => sceneRef.current?.zoomIn()}
        onZoomOut={() => sceneRef.current?.zoomOut()}
        onReset={() => { sceneRef.current?.reset(); setSelectedCountry(null) }}
      />

      {!selectedCountry && <Instructions />}

      <VideoPlayer
        channel={playingChannel}
        onClose={() => setPlayingChannel(null)}
      />
    </div>
  )
}
