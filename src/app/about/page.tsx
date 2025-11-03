'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Passionate developer creating modern web experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">My Story</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            I'm a full-stack developer with a passion for creating beautiful, functional, and user-friendly web applications.
            With expertise in modern JavaScript frameworks and a keen eye for design, I strive to build applications
            that not only work flawlessly but also provide exceptional user experiences.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This portfolio showcases my journey in web development, featuring projects built with cutting-edge technologies
            and best practices. I'm always excited to take on new challenges and collaborate on innovative solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills & Technologies</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• React & Next.js</li>
              <li>• TypeScript & JavaScript</li>
              <li>• Tailwind CSS</li>
              <li>• Node.js & Express</li>
              <li>• Firebase & Authentication</li>
              <li>• Progressive Web Apps</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What I Do</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Frontend Development</li>
              <li>• UI/UX Design</li>
              <li>• PWA Development</li>
              <li>• API Integration</li>
              <li>• Performance Optimization</li>
              <li>• Code Review & Mentoring</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
