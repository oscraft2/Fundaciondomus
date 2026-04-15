'use client'

import { motion } from 'framer-motion'
import BlogCard from './BlogCard'
import type { Post } from '@/lib/schemas'

interface BlogGridProps {
  posts: Post[]
  featuredPost?: Post
  locale: string
}

export default function BlogGrid({ posts, featuredPost, locale }: BlogGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-12"
    >
      {/* Featured Post - Large Hero */}
      {featuredPost && (
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <BlogCard post={featuredPost} featured locale={locale} />
        </motion.div>
      )}

      {/* Grid of Regular Posts - Asymmetric Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id || index}
            variants={itemVariants}
            // Asymmetric layout - alternate sizes
            className={`
              ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
              ${index === 3 ? 'md:col-span-2' : ''}
              ${index === 4 ? 'lg:col-span-2' : ''}
            `}
          >
            <BlogCard post={post} locale={locale} />
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {posts.length >= 6 && (
        <motion.div
          variants={itemVariants}
          className="flex justify-center pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-romus-gold text-romus-gold font-bold rounded-lg hover:bg-romus-gold hover:text-romus-dark transition-all"
          >
            Cargar más posts
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
