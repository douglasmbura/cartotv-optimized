'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Search, ArrowLeft } from 'lucide-react'
import { countries } from '@/data/countries'
import { toSlug } from '@/utils/countrySlug'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function WatchClient({ lang }: { lang: string }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [countrySearch, setCountrySearch] = useState('')

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries
    return countries.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
  }, [countrySearch])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/${lang}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{t('countryPage.watchLiveTV')}</h1>
            <p className="text-sm text-muted-foreground">{t('countryPage.selectCountry')}</p>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('countryPage.searchCountries')}
            value={countrySearch}
            onChange={e => setCountrySearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredCountries.map(c => (
            <button
              key={c.name}
              onClick={() => router.push(`/${lang}/watch/${toSlug(c.name)}`)}
              className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.flag} alt={c.name} className="w-8 h-6 object-cover rounded shadow-sm" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <span className="text-sm font-medium truncate">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
