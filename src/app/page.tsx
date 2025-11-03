'use client'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-jungle-50 to-jungle-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to My
            <span className="text-jungle-600 dark:text-jungle-400"> Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A modern Progressive Web App showcasing my work and skills.
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/about"
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Learn More
            </a>
            <a
              href="/contact"
              className="btn btn-secondary px-8 py-3 text-lg"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Modern Tech Stack</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built with the latest technologies including Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">PWA Ready</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Installable as a mobile app with offline capabilities and push notifications.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Responsive Design</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Optimized for all devices with a beautiful, modern interface.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
