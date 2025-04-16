import type { Event } from "@/lib/types"

export const events: Event[] = [
  {
    id: "hackathon",
    title: "Hackathon",
    description: "24-hour coding challenge to build innovative solutions. Form teams of 3-4 members.",
    price: 500,
    category: "cat1",
    image: "/placeholder.svg?height=400&width=600&text=Hackathon",
    formUrl: "https://forms.google.com/hackathon",
  },
  {
    id: "robocars",
    title: "Robo Cars",
    description: "Design and race robotic cars through an obstacle course. Test your engineering skills!",
    price: 750,
    category: "cat1",
    image: "/placeholder.svg?height=400&width=600&text=RoboCars",
    formUrl: "https://forms.google.com/robocars",
  },
  {
    id: "cicada",
    title: "Cicada",
    description: "Cryptic puzzle-solving challenge that tests your logical thinking and coding skills.",
    price: 300,
    category: "cat2",
    image: "/placeholder.svg?height=400&width=600&text=Cicada",
    formUrl: "https://forms.google.com/cicada",
  },
  {
    id: "aiart",
    title: "AI Art Battle",
    description: "Create stunning artwork using AI tools in this creative showdown.",
    price: 400,
    category: "cat2",
    image: "/placeholder.svg?height=400&width=600&text=AI+Art+Battle",
    formUrl: "https://forms.google.com/aiart",
  },
  {
    id: "techdebate",
    title: "Tech Debate",
    description: "Argue your stance on controversial tech topics in this heated debate competition.",
    price: 250,
    category: "cat2",
    image: "/placeholder.svg?height=400&width=600&text=Tech+Debate",
    formUrl: "https://forms.google.com/techdebate",
  },
  {
    id: "ideathon",
    title: "Ideathon",
    description: "Brainstorm innovative solutions to real-world problems in this idea marathon.",
    price: 350,
    category: "cat2",
    image: "/placeholder.svg?height=400&width=600&text=Ideathon",
    formUrl: "https://forms.google.com/ideathon",
  },
  {
    id: "quickquery",
    title: "Quick Query",
    description: "Test your SQL and database knowledge in this fast-paced query challenge.",
    price: 200,
    category: "cat2",
    image: "/placeholder.svg?height=400&width=600&text=Quick+Query",
    formUrl: "https://forms.google.com/quickquery",
  },
  {
    id: "blankcoding",
    title: "Blank Coding",
    description: "Code without seeing the output until submission. Test your debugging skills!",
    price: 300,
    category: "cat3",
    image: "/placeholder.svg?height=400&width=600&text=Blank+Coding",
    formUrl: "https://forms.google.com/blankcoding",
  },
  {
    id: "techwhisper",
    title: "Tech Whisper",
    description: "Communicate technical concepts without using technical terms in this fun challenge.",
    price: 200,
    category: "cat3",
    image: "/placeholder.svg?height=400&width=600&text=Tech+Whisper",
    formUrl: "https://forms.google.com/techwhisper",
  },
  {
    id: "techpictionary",
    title: "Tech Pictionary",
    description: "Draw and guess technical concepts in this visual challenge.",
    price: 250,
    category: "cat3",
    image: "/placeholder.svg?height=400&width=600&text=Tech+Pictionary",
    formUrl: "https://forms.google.com/techpictionary",
  },
  {
    id: "techtimesup",
    title: "Tech Time's Up",
    description: "Describe technical terms against the clock in this fast-paced word game.",
    price: 200,
    category: "cat3",
    image: "/placeholder.svg?height=400&width=600&text=Tech+Times+Up",
    formUrl: "https://forms.google.com/techtimesup",
  },
  {
    id: "turbotyping",
    title: "Turbo Typing",
    description: "Test your typing speed and accuracy in this keyboard challenge.",
    price: 150,
    category: "cat3",
    image: "/placeholder.svg?height=400&width=600&text=Turbo+Typing",
    formUrl: "https://forms.google.com/turbotyping",
  },
]

export const categoryNames = {
  cat1: "Technical Competitions",
  cat2: "Creative Challenges",
  cat3: "Fun Tech Games",
}

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id)
}

export function getEventsByCategory(category: string): Event[] {
  if (category === "all") return events
  return events.filter((event) => event.category === category)
}
