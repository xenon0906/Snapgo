'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileUpload } from '@/components/ui/FileUpload'
import {
  Image as ImageIcon,
  Upload,
  Search,
  Grid,
  List,
  Trash2,
  Copy,
  Check,
  Loader2,
  FolderOpen,
  FileImage,
  Filter,
  SortAsc,
  RefreshCw,
  Eye,
  Download,
  X,
} from 'lucide-react'

interface MediaFile {
  id: string
  url: string
  filename: string
  category: string
  size: number
  uploadedAt: string
  mimeType: string
}

// Mock data - replace with actual API
const mockMedia: MediaFile[] = [
  { id: '1', url: '/images/logo/Snapgo Logo White.png', filename: 'Snapgo Logo White.png', category: 'logo', size: 45000, uploadedAt: '2024-12-15', mimeType: 'image/png' },
  { id: '2', url: '/images/logo/Snapgo Logo Blue.png', filename: 'Snapgo Logo Blue.png', category: 'logo', size: 48000, uploadedAt: '2024-12-15', mimeType: 'image/png' },
  { id: '3', url: '/images/mockups/app-screen-1.png', filename: 'app-screen-1.png', category: 'mockup', size: 156000, uploadedAt: '2024-12-10', mimeType: 'image/png' },
  { id: '4', url: '/images/team/mohit.jpg', filename: 'mohit.jpg', category: 'team', size: 89000, uploadedAt: '2024-12-08', mimeType: 'image/jpeg' },
]

const categories = [
  { id: 'all', label: 'All Files', icon: FolderOpen },
  { id: 'logo', label: 'Logos', icon: ImageIcon },
  { id: 'mockup', label: 'Mockups', icon: FileImage },
  { id: 'team', label: 'Team Photos', icon: FileImage },
  { id: 'blog', label: 'Blog Images', icon: FileImage },
  { id: 'other', label: 'Other', icon: FolderOpen },
]

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaFile[]>(mockMedia)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [showUpload, setShowUpload] = useState(false)

  const filteredMedia = media.filter((file) => {
    const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleUploadComplete = (url: string) => {
    const newFile: MediaFile = {
      id: Date.now().toString(),
      url,
      filename: url.split('/').pop() || 'uploaded-file',
      category: 'other',
      size: 0,
      uploadedAt: new Date().toISOString().split('T')[0],
      mimeType: 'image/png',
    }
    setMedia([newFile, ...media])
    setShowUpload(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setMedia(media.filter((f) => f.id !== id))
      if (selectedFile?.id === id) setSelectedFile(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-primary" />
            Media Library
          </h1>
          <p className="text-muted-foreground">Manage all your images and media files</p>
        </div>
        <Button onClick={() => setShowUpload(true)} variant="gradient" size="lg">
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowUpload(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background rounded-2xl p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Upload Media</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowUpload(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <FileUpload
              category="media"
              label="Drop files here or click to upload"
              description="PNG, JPG, WebP, GIF up to 10MB"
              onUploadComplete={handleUploadComplete}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Filters & View Toggle */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* File Grid/List */}
        <div className="lg:col-span-3">
          {filteredMedia.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No files found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try a different search term' : 'Upload your first file to get started'}
                </p>
                <Button onClick={() => setShowUpload(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Media
                </Button>
              </CardContent>
            </Card>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative rounded-xl overflow-hidden border bg-muted/30 hover:border-primary/50 transition-all cursor-pointer ${
                    selectedFile?.id === file.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={file.url}
                      alt={file.filename}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(file.url, file.id)
                      }}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
                    >
                      {copiedId === file.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(file.id)
                      }}
                      className="p-2 bg-white/20 rounded-lg hover:bg-red-500/50"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="p-2 border-t bg-background">
                    <p className="text-xs font-medium truncate">{file.filename}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="p-4">Preview</th>
                      <th className="p-4">Filename</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Size</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedia.map((file) => (
                      <tr
                        key={file.id}
                        className={`border-b hover:bg-muted/50 cursor-pointer ${
                          selectedFile?.id === file.id ? 'bg-primary/5' : ''
                        }`}
                        onClick={() => setSelectedFile(file)}
                      >
                        <td className="p-4">
                          <div className="w-12 h-12 relative rounded overflow-hidden bg-muted">
                            <Image src={file.url} alt={file.filename} fill className="object-contain" />
                          </div>
                        </td>
                        <td className="p-4 font-medium">{file.filename}</td>
                        <td className="p-4">
                          <Badge variant="outline">{file.category}</Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{formatFileSize(file.size)}</td>
                        <td className="p-4 text-muted-foreground">{file.uploadedAt}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(file.url, file.id)
                              }}
                              className="p-2 hover:bg-muted rounded"
                            >
                              {copiedId === file.id ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(file.id)
                              }}
                              className="p-2 hover:bg-red-100 rounded text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* File Details Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">File Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={selectedFile.url}
                      alt={selectedFile.filename}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Filename</p>
                      <p className="font-medium text-sm">{selectedFile.filename}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">URL</p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted p-1 rounded flex-1 truncate">
                          {selectedFile.url}
                        </code>
                        <button
                          onClick={() => copyToClipboard(selectedFile.url, selectedFile.id)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          {copiedId === selectedFile.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Size</p>
                        <p className="font-medium text-sm">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Category</p>
                        <p className="font-medium text-sm capitalize">{selectedFile.category}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Uploaded</p>
                      <p className="font-medium text-sm">{selectedFile.uploadedAt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={selectedFile.url} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(selectedFile.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileImage className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Select a file to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{media.length}</p>
            <p className="text-sm text-muted-foreground">Total Files</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-teal">
              {formatFileSize(media.reduce((acc, f) => acc + f.size, 0))}
            </p>
            <p className="text-sm text-muted-foreground">Total Size</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-purple">{categories.length - 1}</p>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">
              {media.filter((f) => f.uploadedAt === new Date().toISOString().split('T')[0]).length}
            </p>
            <p className="text-sm text-muted-foreground">Uploaded Today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
