/**
 * Akses API backend Vanguard (Express + SQLite/PostgreSQL).
 * Server-side only — dipanggil dari Server Component, jadi tidak butuh CORS
 * dan URL API tidak diekspos ke browser.
 */

export interface PublicStats {
  totalLeads: number
  conversionRate: number
  avgResponseMinutes: number | null
  pipelineValue: number
  leadsByStatus: { stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won'; count: number }[]
  dealValueByStage: Record<string, { count: number; value: number }>
  leadsBySource: { source: string; count: number }[]
  topCampaigns: { name: string; leads: number }[]
  leadsTrend: { date: string; count: number }[]
  trendTotal: number
  trendDeltaPct: number | null
  responseTrend: { date: string; avg: number | null }[]
  sla: { targetMinutes: number; respondedCount: number; withinTargetPct: number | null }
  activeCampaigns: number
  updatedAt: string
}

const API_URL = process.env.API_URL ?? 'http://localhost:4000'

/**
 * Ambil statistik publik. Null kalau API tidak tersedia — caller memakai
 * data contoh sebagai fallback supaya halaman tetap tampil.
 */
export async function fetchStats(): Promise<PublicStats | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/stats`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { stats: PublicStats }
    return data.stats
  } catch {
    return null
  }
}
