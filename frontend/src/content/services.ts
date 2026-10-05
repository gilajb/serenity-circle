import { BookOpen, Brain, CloudSun, HeartHandshake, Smile } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  slug: string
  name: string
  summary: string
  icon: LucideIcon
}

// Approved wording from docs/company-profile.md. Moves to the API in Phase 1.
export const services: Service[] = [
  {
    slug: 'child-therapy',
    name: 'Child Therapy',
    summary:
      'Helping young people build confidence, manage emotions and develop healthy coping skills. For ages 3 to 18.',
    icon: Smile,
  },
  {
    slug: 'education',
    name: 'Education',
    summary: 'Helping children navigate school.',
    icon: BookOpen,
  },
  {
    slug: 'anxiety-adhd',
    name: 'Anxiety & ADHD',
    summary: 'Personalised support to manage anxiety and the challenges of ADHD.',
    icon: Brain,
  },
  {
    slug: 'stress-depression',
    name: 'Stress & Depression',
    summary: 'Practical tools to manage stress, lift low mood and restore balance.',
    icon: CloudSun,
  },
  {
    slug: 'trauma-ptsd',
    name: 'Trauma & PTSD',
    summary: 'Specialised trauma therapy to heal from past experiences.',
    icon: HeartHandshake,
  },
]
