import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Product } from '@/components/product'
import { Pipeline } from '@/components/pipeline'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { fetchStats } from '@/lib/api'

// Render di server tiap request (stale-while-revalidate tiap 60 detik)
export const revalidate = 60

export default async function Home() {
  const stats = await fetchStats()

  return (
    <>
      <Navbar />
      <main>
        <Hero stats={stats} />
        <Features />
        <Product stats={stats} />
        <Pipeline stats={stats} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
