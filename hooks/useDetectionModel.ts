'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export interface Detection {
  class: string
  score: number
  bbox: [number, number, number, number]
}

export function useDetectionModel() {
  const modelRef = useRef<cocoSsd.ObjectDetection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load model on mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true)
        const model = await cocoSsd.load()
        modelRef.current = model
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load model')
        setLoading(false)
      }
    }

    loadModel()

    return () => {
      // Cleanup if needed
    }
  }, [])

  // Predict function
  const predict = useCallback(
    async (imageData: CanvasImageSource): Promise<Detection[]> => {
      if (!modelRef.current) {
        return []
      }

      try {
        const predictions = await modelRef.current.detect(imageData)
        // Map predictions to our Detection interface
        return predictions.map((pred) => ({
          class: pred.class,
          score: pred.score,
          bbox: pred.bbox as [number, number, number, number],
        }))
      } catch (err) {
        console.error('Detection error:', err)
        return []
      }
    },
    []
  )

  return {
    loading,
    error,
    predict,
    model: modelRef.current,
  }
}
