"use client"

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import StageCard from "./StageCard.tsx"


export default function Page() {

  const params = useParams()

  const projectId = params.projectId

  const [stages, setStages] = useState<StageData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!projectId) {
      setIsLoading(false)
      return
    }


    const fetchStages = async () => {
      try {
        const response = await fetch(`/api/stages?projectId=${projectId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch stages: ${response.statusText}`)
        }

        const data: StageData[] = await response.json()
        setStages(data)
      } catch (err: any) {
        console.error("Error fetching stages:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStages()
  }, [projectId])

  if (isLoading) {
    return <div className="p-4 text-center">Loading stages...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>
  }

  if (stages.length === 0) {
    return <div className="p-4 text-center text-gray-500">No stages found for this project.</div>
  }
  
  console.log(stages)

  return (
    <div className="flex flex-wrap gap-4">
      {
        stages.map((s) => (
          <StageCard
            key={s._id}
            name={s.name}
            redirect={`/${s._id}`}
          />
        ))
      }
    </div>
  )
}
