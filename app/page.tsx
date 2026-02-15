import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Camera, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-500/10 rounded-2xl">
              <Shield className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Weapon Detection System
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Advanced AI-powered real-time detection using your webcam. Identify threats
            instantly with state-of-the-art machine learning.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-16">
          <Link href="/detection">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 gap-2">
              <Camera className="w-5 h-5" />
              Launch Detection System
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-500/10 rounded-lg mb-4">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Real-time Processing
                </h3>
                <p className="text-slate-400">
                  Instant detection with low latency processing directly in your
                  browser
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-500/10 rounded-lg mb-4">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Privacy First
                </h3>
                <p className="text-slate-400">
                  All processing happens locally - no data is sent to external servers
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-500/10 rounded-lg mb-4">
                  <Camera className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Multi-Object Detection
                </h3>
                <p className="text-slate-400">
                  Detects multiple objects simultaneously with high accuracy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: '1',
                title: 'Access Camera',
                desc: 'Grant browser access to your webcam',
              },
              {
                num: '2',
                title: 'Load Model',
                desc: 'AI model is loaded into your browser',
              },
              {
                num: '3',
                title: 'Process Frames',
                desc: 'Video frames analyzed in real-time',
              },
              {
                num: '4',
                title: 'Detection',
                desc: 'Objects detected and highlighted',
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Powered by</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['TensorFlow.js', 'COCO-SSD', 'React', 'Next.js'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
