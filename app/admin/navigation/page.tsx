'use client'

import { useState } from 'react'
import { motion, Reorder } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Menu,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Home,
  Info,
  Briefcase,
  Users,
  FileText,
  Phone,
  Shield,
  HelpCircle,
  Link as LinkIcon,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  href: string
  icon: string
  visible: boolean
  external: boolean
  order: number
  children?: MenuItem[]
}

interface FooterLink {
  id: string
  label: string
  href: string
  visible: boolean
}

interface FooterSection {
  id: string
  title: string
  links: FooterLink[]
}

// Initial menu items
const initialMenuItems: MenuItem[] = [
  { id: '1', label: 'Home', href: '/', icon: 'Home', visible: true, external: false, order: 1 },
  { id: '2', label: 'Features', href: '/features', icon: 'Star', visible: true, external: false, order: 2 },
  { id: '3', label: 'How It Works', href: '/how-it-works', icon: 'HelpCircle', visible: true, external: false, order: 3 },
  { id: '4', label: 'Safety', href: '/safety', icon: 'Shield', visible: true, external: false, order: 4 },
  { id: '5', label: 'About', href: '/about', icon: 'Info', visible: true, external: false, order: 5 },
  { id: '6', label: 'Team', href: '/team', icon: 'Users', visible: true, external: false, order: 6 },
  { id: '7', label: 'Blog', href: '/blog', icon: 'FileText', visible: true, external: false, order: 7 },
  { id: '8', label: 'Contact', href: '/contact', icon: 'Phone', visible: true, external: false, order: 8 },
]

const initialFooterSections: FooterSection[] = [
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'f1', label: 'About Us', href: '/about', visible: true },
      { id: 'f2', label: 'Team', href: '/team', visible: true },
      { id: 'f3', label: 'Careers', href: '/careers', visible: false },
      { id: 'f4', label: 'Blog', href: '/blog', visible: true },
    ],
  },
  {
    id: 'product',
    title: 'Product',
    links: [
      { id: 'f5', label: 'Features', href: '/features', visible: true },
      { id: 'f6', label: 'How It Works', href: '/how-it-works', visible: true },
      { id: 'f7', label: 'Safety', href: '/safety', visible: true },
      { id: 'f8', label: 'FAQ', href: '/faq', visible: true },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { id: 'f9', label: 'Privacy Policy', href: '/privacy', visible: true },
      { id: 'f10', label: 'Terms of Service', href: '/terms', visible: true },
      { id: 'f11', label: 'Refund Policy', href: '/refund', visible: true },
    ],
  },
]

const iconOptions = [
  'Home', 'Info', 'Briefcase', 'Users', 'FileText', 'Phone', 'Shield', 'HelpCircle', 'Star', 'Heart', 'Mail', 'Map'
]

export default function NavigationPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [footerSections, setFooterSections] = useState<FooterSection[]>(initialFooterSections)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header')
  const [expandedSection, setExpandedSection] = useState<string | null>('company')

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Navigation saved successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save navigation' })
    } finally {
      setSaving(false)
    }
  }

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      label: 'New Link',
      href: '/',
      icon: 'LinkIcon',
      visible: true,
      external: false,
      order: menuItems.length + 1,
    }
    setMenuItems([...menuItems, newItem])
  }

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const addFooterLink = (sectionId: string) => {
    const newLink: FooterLink = {
      id: Date.now().toString(),
      label: 'New Link',
      href: '/',
      visible: true,
    }
    setFooterSections(
      footerSections.map((section) =>
        section.id === sectionId
          ? { ...section, links: [...section.links, newLink] }
          : section
      )
    )
  }

  const updateFooterLink = (sectionId: string, linkId: string, updates: Partial<FooterLink>) => {
    setFooterSections(
      footerSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              links: section.links.map((link) =>
                link.id === linkId ? { ...link, ...updates } : link
              ),
            }
          : section
      )
    )
  }

  const removeFooterLink = (sectionId: string, linkId: string) => {
    setFooterSections(
      footerSections.map((section) =>
        section.id === sectionId
          ? { ...section, links: section.links.filter((link) => link.id !== linkId) }
          : section
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Menu className="w-8 h-8 text-primary" />
            Navigation Editor
          </h1>
          <p className="text-muted-foreground">Customize header and footer navigation menus</p>
        </div>
        <Button onClick={handleSave} disabled={saving} variant="gradient" size="lg">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Status Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-600'
              : 'bg-red-500/10 border border-red-500/20 text-red-500'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('header')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'header'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Header Menu
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'footer'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Footer Links
        </button>
      </div>

      {/* Header Menu Editor */}
      {activeTab === 'header' && (
        <Card>
          <CardHeader>
            <CardTitle>Header Navigation</CardTitle>
            <CardDescription>Drag to reorder, toggle visibility, or add new links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Reorder.Group
              axis="y"
              values={menuItems}
              onReorder={setMenuItems}
              className="space-y-3"
            >
              {menuItems.map((item) => (
                <Reorder.Item
                  key={item.id}
                  value={item}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <motion.div
                    layout
                    className={`flex items-center gap-4 p-4 rounded-xl border bg-background hover:shadow-md transition-shadow ${
                      !item.visible ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Label</Label>
                        <Input
                          value={item.label}
                          onChange={(e) => updateMenuItem(item.id, { label: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">URL</Label>
                        <Input
                          value={item.href}
                          onChange={(e) => updateMenuItem(item.id, { href: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Icon</Label>
                        <select
                          value={item.icon}
                          onChange={(e) => updateMenuItem(item.id, { icon: e.target.value })}
                          className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          {iconOptions.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-end gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.visible}
                            onCheckedChange={(checked) => updateMenuItem(item.id, { visible: checked })}
                          />
                          <span className="text-xs">{item.visible ? 'Visible' : 'Hidden'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.external}
                            onCheckedChange={(checked) => updateMenuItem(item.id, { external: checked })}
                          />
                          <span className="text-xs">External</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeMenuItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <Button variant="outline" onClick={addMenuItem} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Footer Links Editor */}
      {activeTab === 'footer' && (
        <div className="space-y-4">
          {footerSections.map((section) => (
            <Card key={section.id}>
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{section.links.filter((l) => l.visible).length} active</Badge>
                    {expandedSection === section.id ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </CardHeader>
              {expandedSection === section.id && (
                <CardContent className="space-y-3">
                  {section.links.map((link) => (
                    <motion.div
                      key={link.id}
                      layout
                      className={`flex items-center gap-4 p-3 rounded-lg border ${
                        !link.visible ? 'opacity-50 bg-muted/30' : 'bg-background'
                      }`}
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Label</Label>
                          <Input
                            value={link.label}
                            onChange={(e) =>
                              updateFooterLink(section.id, link.id, { label: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">URL</Label>
                          <Input
                            value={link.href}
                            onChange={(e) =>
                              updateFooterLink(section.id, link.id, { href: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateFooterLink(section.id, link.id, { visible: !link.visible })
                          }
                          className={`p-2 rounded-lg transition-colors ${
                            link.visible ? 'text-green-600 hover:bg-green-50' : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {link.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => removeFooterLink(section.id, link.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addFooterLink(section.id)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your navigation will appear on the website</CardDescription>
        </CardHeader>
        <CardContent>
          {activeTab === 'header' ? (
            <div className="bg-gray-900 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="w-24 h-8 bg-white/20 rounded" />
                <div className="flex items-center gap-4">
                  {menuItems
                    .filter((item) => item.visible)
                    .map((item) => (
                      <a
                        key={item.id}
                        href="#"
                        className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-1"
                      >
                        {item.label}
                        {item.external && <ExternalLink className="w-3 h-3" />}
                      </a>
                    ))}
                </div>
                <div className="w-24 h-8 bg-primary rounded" />
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="grid grid-cols-3 gap-8">
                {footerSections.map((section) => (
                  <div key={section.id}>
                    <h4 className="text-white font-semibold mb-3">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.links
                        .filter((link) => link.visible)
                        .map((link) => (
                          <li key={link.id}>
                            <a href="#" className="text-white/60 hover:text-white text-sm">
                              {link.label}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
