import { Link } from "react-router-dom"
import { Home, ArrowLeft, Droplets } from "lucide-react"
import { Button } from "../components/ui/button"

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-900/40 to-surface-elevated">
          <Droplets className="h-10 w-10 text-brand-400" />
        </div>
        <div className="mb-2 text-8xl font-black gradient-text font-display">404</div>
        <h1 className="mb-2 text-xl font-bold font-display">Page not found</h1>
        <p className="mb-8 text-text-secondary">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/"><Button className="rounded-xl bg-brand-500 hover:bg-brand-600 font-display"><Home className="mr-2 h-4 w-4" /> Go Home</Button></Link>
          <Button variant="outline" className="rounded-xl border-border/60 font-display" onClick={() => window.history.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Go Back</Button>
        </div>
      </div>
    </main>
  )
}
