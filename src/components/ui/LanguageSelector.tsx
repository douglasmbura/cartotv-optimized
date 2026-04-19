'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const languages = [
  { code: 'en', name: 'English',    nativeName: 'English'          },
  { code: 'es', name: 'Spanish',    nativeName: 'Español'          },
  { code: 'fr', name: 'French',     nativeName: 'Français'         },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português'        },
  { code: 'ar', name: 'Arabic',     nativeName: 'العربية'          },
  { code: 'de', name: 'German',     nativeName: 'Deutsch'          },
  { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी'            },
  { code: 'zh', name: 'Chinese',    nativeName: '中文'              },
  { code: 'sw', name: 'Swahili',    nativeName: 'Kiswahili'        },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ru', name: 'Russian',    nativeName: 'Русский'          },
] as const

type LangCode = typeof languages[number]['code']

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = languages.find(l => l.code === i18n.language) ?? languages[0]

  const handleLanguageChange = (langCode: LangCode) => {
    const parts = pathname.split('/').filter(Boolean)
    const isLangPrefix = languages.some(l => l.code === parts[0])
    const rest = isLangPrefix ? parts.slice(1) : parts
    const newPath = `/${langCode}${rest.length > 0 ? '/' + rest.join('/') : ''}`
    i18n.changeLanguage(langCode)
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass-panel border-0 gap-2 px-3">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.nativeName}</span>
          <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border/50">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center justify-between cursor-pointer ${
              i18n.language === lang.code ? 'bg-primary/20 text-primary' : ''
            }`}
          >
            <span>{lang.nativeName}</span>
            <span className="text-xs text-muted-foreground">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
