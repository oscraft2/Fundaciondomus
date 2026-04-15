'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'
import type { Post } from '@/lib/schemas'

interface BlogCardProps {
  post: Post
  featured?: boolean
  locale: string
}

export default function BlogCard({ post, featured = false, locale }: BlogCardProps) {
  const categoryColors: Record<string, string> = {
    'Fe': 'from-purple-500 to-purple-600',
    'Comunidad': 'from-blue-500 to-blue-600',
    'Educación': 'from-green-500 to-green-600',
    'Acción Social': 'from-red-500 to-red-600',
  }

  const categoryColor = categoryColors[post.category] || 'from-romus-gold to-yellow-600'
  const readTime = Math.ceil((post.content?.length || 0) / 200)

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl h-96 md:h-500 group cursor-pointer"
      >
        {/* Background Image */}
        {post.featuredImage && (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
          <motion.div
            whileHover={{ y: -4 }}
            className="space-y-4"
          >
            {/* Category Badge */}
            <div className={`inline-block bg-gradient-to-r ${categoryColor} px-4 py-2 rounded-full w-fit`}>
              <span className="text-white text-sm font-bold">{post.category}</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif line-clamp-3">
              {post.title}
            </h2>

            {/* Meta & Excerpt */}
            <div className="space-y-3">
              <p className="text-gray-200 text-lg line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-gray-300 text-sm">
                <span>{post.authorName}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{readTime} min</span>
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-romus-gold font-bold text-lg pt-2"
            >
              Leer más <ChevronRight size={20} />
            </motion.div>
          </motion.div>
        </div>
      </motion.article>
    )
  }

  // Regular card
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-romus-gold/20 cursor-pointer"
    >
      {/* Blur Glass Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-romus-gold/10 to-transparent blur-xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Category Badge */}
        <div className={`inline-block bg-gradient-to-r ${categoryColor} px-3 py-1 rounded-full w-fit mb-3`}>
          <span className="text-white text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 font-serif group-hover:text-romus-gold transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-gray-400 text-xs border-t border-gray-700 pt-4">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{readTime} min</span>
          </div>
          <span className="text-romus-gold font-bold">
            Por {post.authorName}
          </span>
        </div>

        {/* Read More Link */}
        <motion.div
          whileHover={{ x: 4 }}
          className="flex items-center gap-2 text-romus-gold font-bold mt-4 group-hover:text-white transition-colors"
        >
          Leer más <ChevronRight size={16} />
        </motion.div>
      </div>
    </motion.article>
  )
}
