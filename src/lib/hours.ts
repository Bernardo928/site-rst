import { site } from '../data/site'

const DAYS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const fmt = (h: number) => `${String(h % 24).padStart(2, '0')}h`

// Hora atual em São Paulo, independente do fuso de quem visita.
function nowInSaoPaulo(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)!.value
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, hour: Number(get('hour')) + Number(get('minute')) / 60 }
}

export type OpenStatus = { open: boolean; label: string; detail: string }

export function openStatus(date = new Date()): OpenStatus {
  const { day, hour } = nowInSaoPaulo(date)
  const s = site.schedule
  const today = s[day]
  const yesterday = s[(day + 6) % 7]

  if (yesterday && yesterday[1] > 24 && hour < yesterday[1] - 24)
    return { open: true, label: 'Aberto agora', detail: `até ${fmt(yesterday[1])}` }
  if (today && hour >= today[0] && hour < today[1])
    return { open: true, label: 'Aberto agora', detail: `até ${fmt(today[1])}` }
  if (today && hour < today[0]) return { open: false, label: 'Fechado agora', detail: `abre hoje às ${fmt(today[0])}` }

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    if (s[d]) return { open: false, label: 'Fechado agora', detail: `abre ${i === 1 ? 'amanhã' : DAYS[d]} às ${fmt(s[d][0])}` }
  }
  return { open: false, label: 'Fechado agora', detail: '' }
}
