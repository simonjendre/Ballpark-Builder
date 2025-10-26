import { BallparkCalculator } from "@/components/ballpark-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
              Ballpark Pricing Calculator
            </h1>
            <p className="text-lg text-slate-600 text-pretty">
              Get instant estimates for events and custom retail builds
            </p>
          </div>
          <BallparkCalculator />
        </div>
      </div>
    </main>
  )
}
