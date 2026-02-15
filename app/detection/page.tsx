'use client'

import React, { useState } from 'react'
import { WebcamFeed } from '@/components/WebcamFeed'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Play, Square, Loader2 } from 'lucide-react'
import type { Detection } from '@/hooks/useDetectionModel'

export default function WeaponDetectionPage() {
  const [isRunning, setIsRunning] = useState(true)
  const [detections, setDetections] = useState<Detection[]>([])
  const [history, setHistory] = useState<{ timestamp: Date; class: string }[]>([])

  const handleDetections = (newDetections: Detection[]) => {
    setDetections(newDetections)

    // Update history with new detections
    if (newDetections.length > 0) {
      newDetections.forEach((detection) => {
        if (detection.score > 0.6) {
          setHistory((prev) => [
            {
              timestamp: new Date(),
              class: detection.class,
            },
            ...prev.slice(0, 9), // Keep last 10
          ])
        }
      })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Weapon Detection System
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Real-time object detection using AI-powered analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Detection Feed */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <CardHeader className="bg-slate-900 border-b border-slate-700">
                <CardTitle className="text-white flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-500'
                    }`}
                  ></div>
                  Live Camera Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <WebcamFeed onDetections={handleDetections} enabled={isRunning} />
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 gap-2 ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4" />
                    Stop Detection
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start Detection
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Detection Stats */}
            <Card className="bg-slate-800 border-slate-700 mb-6">
              <CardHeader className="bg-slate-900 border-b border-slate-700">
                <CardTitle className="text-white text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Active Detections</p>
                    <p className="text-3xl font-bold text-white">
                      {detections.length}
                    </p>
                  </div>

                  {detections.length > 0 && (
                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-slate-400 text-sm mb-3">Detected Objects</p>
                      <div className="space-y-2">
                        {detections.map((det, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-slate-700/50 p-2 rounded text-sm"
                          >
                            <span className="text-slate-200 font-medium">
                              {det.class}
                            </span>
                            <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-600/30">
                              {(det.score * 100).toFixed(0)}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detection History */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="bg-slate-900 border-b border-slate-700">
                <CardTitle className="text-white text-lg">
                  Recent Detections
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {history.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-4">
                    No detections yet
                  </p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {history.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm p-2 rounded bg-slate-700/50"
                      >
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-slate-200 font-medium">{item.class}</p>
                          <p className="text-slate-400 text-xs">
                            {item.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <Card className="bg-slate-800 border-slate-700 mt-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Detection Model</h3>
                <p className="text-slate-400 text-sm">
                  COCO-SSD powered by TensorFlow.js for real-time object detection
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Detectable Objects</h3>
                <p className="text-slate-400 text-sm">
                  Person, Knife, Bottle, Cup, Backpack, Handbag, and more
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Privacy</h3>
                <p className="text-slate-400 text-sm">
                  All processing happens locally in your browser - no data sent to servers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
