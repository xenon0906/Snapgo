'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface FAQItem {
  question: string
  answer: string
  category: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  categories: string[]
}

export function FAQAccordion({ items, categories }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 rounded-full border-2 focus:border-primary"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        <motion.button
          onClick={() => setActiveCategory('all')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeCategory === 'all'
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          All
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeCategory === category
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No questions found matching your search.</p>
            </motion.div>
          ) : (
            filteredItems.map((item, index) => (
              <motion.div
                key={`${item.category}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Card
                  className={cn(
                    "overflow-hidden transition-all duration-200 cursor-pointer",
                    openItem === index
                      ? "border-primary/50 shadow-lg shadow-primary/10"
                      : "hover:border-primary/30"
                  )}
                  onClick={() => toggleItem(index)}
                >
                  <CardContent className="p-0">
                    {/* Question Header */}
                    <div className="flex items-center justify-between p-5 gap-4">
                      <div className="flex items-start gap-4">
                        <Badge
                          variant="outline"
                          className="text-xs shrink-0 mt-0.5"
                        >
                          {index + 1}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-left">{item.question}</h3>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openItem === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>

                    {/* Answer Content */}
                    <AnimatePresence>
                      {openItem === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                          <div className="px-5 pb-5 pt-0 ml-12">
                            <div className="pt-4 border-t text-muted-foreground leading-relaxed">
                              {item.answer}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
        </motion.p>
      )}
    </div>
  )
}
