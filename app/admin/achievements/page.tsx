'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Award,
  Video,
  FileText,
  Trash2,
  Calendar,
} from 'lucide-react'

interface Achievement {
  id: string
  type: 'CERT' | 'VIDEO' | 'POST'
  title: string
  content: string | null
  mediaUrl: string | null
  createdAt: string
}

const typeIcons = {
  CERT: Award,
  VIDEO: Video,
  POST: FileText,
}

const typeColors = {
  CERT: 'bg-amber-100 text-amber-700',
  VIDEO: 'bg-purple-100 text-purple-700',
  POST: 'bg-blue-100 text-blue-700',
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/achievements')
      const data = await res.json()
      // Ensure data is an array before setting
      setAchievements(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching achievements:', error)
      setAchievements([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return

    try {
      await fetch(`/api/achievements/${id}`, { method: 'DELETE' })
      setAchievements(achievements.filter((a) => a.id !== id))
    } catch (error) {
      console.error('Error deleting achievement:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Manage certificates, videos, and social posts</p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/admin/achievements/create">
            <Plus className="w-5 h-5 mr-2" />
            Add Achievement
          </Link>
        </Button>
      </div>

      {/* Achievement List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin" />
        </div>
      ) : achievements.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = typeIcons[achievement.type]
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${typeColors[achievement.type]} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(achievement.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge variant="outline" className="mb-2">{achievement.type}</Badge>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    {achievement.content && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {achievement.content}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(achievement.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-20 text-center">
            <Award className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No achievements yet</h3>
            <p className="text-muted-foreground mb-6">
              Add your first achievement to showcase snapgo's milestones.
            </p>
            <Button variant="gradient" asChild>
              <Link href="/admin/achievements/create">
                <Plus className="w-5 h-5 mr-2" />
                Add Achievement
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
