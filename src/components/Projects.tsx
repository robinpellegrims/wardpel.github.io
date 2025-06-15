'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'
import { AthleticCard } from '@/components/ui/athletic-card'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

type Project = {
  image: string
  title: string
  description: string
  link: string | null
  category: string
  featured: boolean
  embeddedLink?: {
    url: string
    text: string
  }
  additionalText?: string
}

export default function Projects({ t }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('projects')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const projects: Project[] = [
    {
      image: "/images/pic01.jpg",
      title: t.projects.items.eliteSwimmers.title,
      description: t.projects.items.eliteSwimmers.description,
      link: null,
      category: "Elite Training",
      featured: true
    },
    {
      image: "/images/rwanda1.jpg", 
      title: t.projects.items.rwanda.title,
      description: t.projects.items.rwanda.description,
      link: "https://www.rwandanepic.com/",
      category: "Adventure",
      featured: true
    },
    {
      image: "/images/qlxnow.png",
      title: t.projects.items.qlx.title, 
      description: t.projects.linkTexts.coachAt,
      link: "https://qlxnow.com",
      category: "Technology",
      featured: false,
      embeddedLink: {
        url: "https://www.QLXNOW.com/",
        text: "QLXNOW.com"
      }
    },
    {
      image: "/images/trainingpeaks-logo.png",
      title: t.projects.items.trainingPlans.title,
      description: t.projects.linkTexts.plansAvailableOn,
      link: "https://www.trainingpeaks.com/coach/pellegrims#trainingplans",
      category: "Training Plans",
      featured: false,
      embeddedLink: {
        url: "https://www.trainingpeaks.com/coach/pellegrims#trainingplans",
        text: "TrainingPeaks.com"
      }
    },
    {
      image: "/images/rgf.jpg", 
      title: t.projects.items.startToSwim.title,
      description: t.projects.items.startToSwim.description,
      link: null,
      category: "Community",
      featured: false
    },
    {
      image: "/images/pic03.jpg",
      title: t.projects.items.trainingCamps.title,
      description: t.projects.items.trainingCamps.description, 
      link: null,
      category: "Camps",
      featured: false
    },
    {
      image: "/images/rdmlogo.png",
      title: t.projects.items.rocDuMaroc.title,
      description: t.projects.items.rocDuMaroc.description,
      link: "https://www.rocdumaroc.com/",
      category: "Adventure",
      featured: false
    },
    {
      image: "/images/pic02.jpg",
      title: t.projects.items.gramchallenge.title,
      description: t.projects.linkTexts.workingAsCoach,
      link: "https://gramchallenge.com",
      category: "Platform",
      featured: false,
      embeddedLink: {
        url: "https://www.gramchallenge.com/",
        text: "Gramchallenge.com"
      },
      additionalText: t.projects.linkTexts.between2020And2024
    }
  ]

  const featuredProjects = projects.filter(p => p.featured)
  const regularProjects = projects.filter(p => !p.featured)

  const renderProjectDescription = (project: Project) => {
    if (project.embeddedLink) {
      return (
        <>
          {project.description}{' '}
          <a 
            href={project.embeddedLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ocean-600 hover:text-ocean-700 font-medium transition-colors"
          >
            {project.embeddedLink.text}
          </a>
          {project.additionalText && <>{' '}{project.additionalText}</>}
        </>
      )
    }
    return project.description
  }

  return (
    <section id="projects" className="relative py-24 bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-ocean-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-ocean-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: "120px" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-ocean mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-athletic-dark mb-6">
            {t.projects.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.projects.intro}
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-display font-bold text-athletic-dark mb-8 text-center">
            Featured Work
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <AthleticCard variant="project">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={project.image.includes('trainingpeaks-logo') ? "object-contain p-4 bg-white" : "object-cover"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-ocean text-white text-sm font-semibold rounded-full shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    {/* Link Overlay */}
                    {project.link && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-athletic-dark/80 flex items-center justify-center"
                      >
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-white font-semibold hover:text-ocean-300 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>View Project</span>
                          <FaExternalLinkAlt />
                        </motion.a>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-display font-bold text-athletic-dark mb-3 group-hover:text-ocean-700 transition-colors">
                      {project.link ? (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-ocean-600 transition-colors"
                        >
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {renderProjectDescription(project)}
                    </p>
                    
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-ocean-600 hover:text-ocean-700 font-medium group/link"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span>Learn More</span>
                        <FaArrowRight className="ml-2 text-sm group-hover/link:translate-x-1 transition-transform" />
                      </motion.a>
                    )}
                  </div>
                </AthleticCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regular Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-display font-bold text-athletic-dark mb-8 text-center">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <AthleticCard variant="project">
                  {/* Compact Image */}
                  <div className="relative h-40 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={project.image.includes('trainingpeaks-logo') ? "object-contain p-4 bg-white" : "object-cover"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </motion.div>
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 text-athletic-dark text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-6">
                    <h4 className="font-display font-bold text-athletic-dark mb-2 group-hover:text-ocean-700 transition-colors">
                      {project.link ? (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-ocean-600 transition-colors"
                        >
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {renderProjectDescription(project)}
                    </p>
                    
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-ocean-600 hover:text-ocean-700 font-medium text-sm mt-3 group/link"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span>View</span>
                        <FaArrowRight className="ml-1 text-xs group-hover/link:translate-x-1 transition-transform" />
                      </motion.a>
                    )}
                  </div>
                </AthleticCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}