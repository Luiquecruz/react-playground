import { wait } from '@/lib/utils'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  rating: number
  favorite: boolean
}

export type ProductCategory = 'audio' | 'wearables' | 'computing' | 'gaming'

export interface Message {
  id: string
  author: string
  text: string
  createdAt: string
}

export interface MetricPoint {
  month: string
  revenue: number
  orders: number
  visitors: number
}

export interface User {
  id: number
  name: string
  email: string
  company: string
  role: string
  location: string
}

export const productCategories: ProductCategory[] = ['audio', 'wearables', 'computing', 'gaming']

let products: Product[] = [
  {
    id: 'p-1',
    name: 'Aurora Headphones',
    category: 'audio',
    price: 249,
    rating: 4.8,
    favorite: false,
  },
  { id: 'p-2', name: 'Pulse Earbuds', category: 'audio', price: 129, rating: 4.5, favorite: true },
  {
    id: 'p-3',
    name: 'Echo Studio Speaker',
    category: 'audio',
    price: 199,
    rating: 4.6,
    favorite: false,
  },
  {
    id: 'p-4',
    name: 'Orbit Smartwatch',
    category: 'wearables',
    price: 329,
    rating: 4.4,
    favorite: false,
  },
  {
    id: 'p-5',
    name: 'Stride Fitness Band',
    category: 'wearables',
    price: 89,
    rating: 4.1,
    favorite: false,
  },
  {
    id: 'p-6',
    name: 'Vision AR Glasses',
    category: 'wearables',
    price: 599,
    rating: 4.0,
    favorite: false,
  },
  {
    id: 'p-7',
    name: 'Nimbus Laptop 14',
    category: 'computing',
    price: 1499,
    rating: 4.9,
    favorite: true,
  },
  {
    id: 'p-8',
    name: 'Quartz Mechanical Keyboard',
    category: 'computing',
    price: 159,
    rating: 4.7,
    favorite: false,
  },
  {
    id: 'p-9',
    name: 'Glide Wireless Mouse',
    category: 'computing',
    price: 69,
    rating: 4.3,
    favorite: false,
  },
  {
    id: 'p-10',
    name: 'Nova Game Controller',
    category: 'gaming',
    price: 79,
    rating: 4.6,
    favorite: false,
  },
  {
    id: 'p-11',
    name: 'Horizon VR Headset',
    category: 'gaming',
    price: 449,
    rating: 4.2,
    favorite: false,
  },
  {
    id: 'p-12',
    name: 'Arcade Handheld',
    category: 'gaming',
    price: 299,
    rating: 4.7,
    favorite: false,
  },
]

let messages: Message[] = [
  {
    id: 'm-1',
    author: 'Ada',
    text: 'Form actions with useActionState feel so natural.',
    createdAt: '2026-10-14T10:24:00.000Z',
  },
  {
    id: 'm-2',
    author: 'Linus',
    text: 'The React Compiler removed every useMemo from my codebase.',
    createdAt: '2026-10-15T08:12:00.000Z',
  },
]

const users: User[] = [
  {
    id: 1,
    name: 'Grace Hopper',
    email: 'grace@showcase.dev',
    company: 'Compiler Labs',
    role: 'Principal Engineer',
    location: 'New York',
  },
  {
    id: 2,
    name: 'Alan Turing',
    email: 'alan@showcase.dev',
    company: 'Enigma Systems',
    role: 'Research Lead',
    location: 'London',
  },
  {
    id: 3,
    name: 'Margaret Hamilton',
    email: 'margaret@showcase.dev',
    company: 'Apollo Software',
    role: 'Director of Engineering',
    location: 'Boston',
  },
  {
    id: 4,
    name: 'Dennis Ritchie',
    email: 'dennis@showcase.dev',
    company: 'Unix Foundation',
    role: 'Staff Engineer',
    location: 'Murray Hill',
  },
]

const metrics: MetricPoint[] = [
  { month: 'Jan', revenue: 18400, orders: 312, visitors: 9200 },
  { month: 'Feb', revenue: 21300, orders: 356, visitors: 10400 },
  { month: 'Mar', revenue: 19800, orders: 331, visitors: 9900 },
  { month: 'Apr', revenue: 24600, orders: 402, visitors: 12100 },
  { month: 'May', revenue: 27900, orders: 448, visitors: 13800 },
  { month: 'Jun', revenue: 26100, orders: 421, visitors: 13100 },
  { month: 'Jul', revenue: 30500, orders: 497, visitors: 15200 },
  { month: 'Aug', revenue: 33800, orders: 541, visitors: 16900 },
  { month: 'Sep', revenue: 32200, orders: 518, visitors: 16300 },
  { month: 'Oct', revenue: 36900, orders: 589, visitors: 18400 },
]

export const failingUserId = 5

export async function fetchProducts(): Promise<Product[]> {
  await wait(700)
  return products
}

export async function toggleProductFavorite(productId: string): Promise<Product> {
  await wait(600)
  if (Math.random() < 0.2) {
    throw new Error('Network glitch, the favorite was rolled back')
  }
  products = products.map((product) =>
    product.id === productId ? { ...product, favorite: !product.favorite } : product,
  )
  return products.find((product) => product.id === productId)!
}

export async function fetchMessages(): Promise<Message[]> {
  await wait(500)
  return messages
}

export async function createMessage(input: Pick<Message, 'author' | 'text'>): Promise<Message> {
  await wait(1200)
  if (input.text.toLowerCase().includes('error')) {
    throw new Error('The server rejected messages containing "error"')
  }
  const message: Message = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  }
  messages = [message, ...messages]
  return message
}

export async function fetchUser(userId: number): Promise<User> {
  await wait(900)
  const user = users.find((candidate) => candidate.id === userId)
  if (!user) {
    throw new Error(`User #${userId} could not be loaded`)
  }
  return user
}

export async function fetchMetrics(): Promise<MetricPoint[]> {
  await wait(800)
  return metrics
}
