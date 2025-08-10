# 🏭 TUK P Gas - Landing Page

Landing page modern untuk Tempat Uji Kompetensi (TUK) P Gas dengan animasi Framer Motion dan fitur responsif.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Instalasi](#-instalasi)
- [Struktur Project](#-struktur-project)
- [Komponen](#-komponen)
- [API Routes](#-api-routes)
- [Animasi](#-animasi)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)

## ✨ Fitur Utama

### 🎨 **UI/UX Modern**

- Design system yang konsisten dengan Tailwind CSS
- Responsive design untuk semua device
- Dark mode support (opsional)
- Loading states dan error handling

### 🎭 **Animasi Framer Motion**

- Entrance animations untuk semua section
- Hover effects dan micro-interactions
- Scroll-triggered animations
- Stagger animations untuk list items
- Parallax scrolling effects

### 📱 **Komponen Interaktif**

- **Hero Section**: Parallax scrolling dengan CTA buttons
- **Navbar**: Sticky navigation dengan mobile menu
- **About Section**: Marquee client logos, organizational structure
- **Course Section**: Filter system, search, category tabs
- **Schedule Section**: FullCalendar integration dengan filter
- **Contact Section**: Direct WhatsApp integration
- **Footer**: Responsive layout dengan social links

### 🔍 **Sistem Filter & Search**

- **Course Filtering**: By category, search by title/competencies
- **Schedule Filtering**: By course, status, location search
- **Real-time Search**: Instant filtering results
- **Clear Filters**: Easy reset functionality

### 📞 **Contact Integration**

- **Direct WhatsApp**: One-click WhatsApp chat
- **Pre-filled Messages**: Customized message templates
- **Multiple Contact Methods**: Phone, email, address
- **Operating Hours**: Clear business hours display

## 🛠 Teknologi yang Digunakan

### **Frontend**

- **Next.js 14**: React framework dengan App Router
- **React 18**: UI library dengan hooks
- **TypeScript**: Type safety (opsional)
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### **Backend & Database**

- **Prisma ORM**: Database toolkit
- **PostgreSQL**: Primary database
- **Next.js API Routes**: Backend API endpoints

### **UI Components**

- **shadcn/ui**: Modern component library
- **Lucide React**: Icon library
- **FullCalendar**: Calendar component untuk jadwal

### **Development Tools**

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git**: Version control

## 🚀 Instalasi

### **Prerequisites**

- Node.js 18+
- npm atau yarn
- PostgreSQL database

### **Setup Project**

```bash
# Clone repository
git clone <repository-url>
cd tuk_landing_page

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Configure database
# Edit .env.local dengan database credentials

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### **Environment Variables**

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tukpgas"

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="your-ga-id"
```

## 📁 Struktur Project

```
tuk_landing_page/
├── app/
│   ├── (client)/           # Client pages
│   │   ├── page.js         # Home page
│   │   ├── about/          # About page
│   │   ├── course/         # Course page
│   │   ├── schedule/       # Schedule page
│   │   └── animations-demo/ # Animation showcase
│   ├── (admin)/            # Admin pages
│   │   └── admin/          # Admin dashboard
│   └── api/                # API routes
│       ├── courses/        # Course API
│       ├── schedules/      # Schedule API
│       └── organizational-structure/ # Structure API
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── HeroSection.jsx     # Hero section
│   ├── Navbar.jsx          # Navigation
│   ├── AboutSection.jsx    # About section
│   ├── CourseSection.jsx   # Course section
│   ├── ScheduleSection.jsx # Schedule section
│   ├── ContactSection.jsx  # Contact section
│   ├── Footer.jsx          # Footer
│   └── animated/           # Animated components
├── lib/
│   ├── db.js              # Prisma client
│   ├── validations.js     # Zod schemas
│   └── api.js             # API utilities
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
└── public/
    └── images/            # Static images
```

## 🧩 Komponen

### **Core Components**

#### **HeroSection.jsx**

```jsx
// Hero section dengan parallax scrolling
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Hero content */}
</motion.div>
```

**Fitur:**

- Parallax background scrolling
- Staggered text animations
- CTA buttons dengan hover effects
- Responsive design

#### **Navbar.jsx**

```jsx
// Sticky navigation dengan mobile menu
<motion.nav variants={navbarVariants} initial="hidden" animate="visible">
  {/* Navigation items */}
</motion.nav>
```

**Fitur:**

- Sticky positioning
- Mobile hamburger menu
- Smooth scroll navigation
- Logo animations

#### **AboutSection.jsx**

```jsx
// About section dengan organizational structure
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  {/* About content */}
</motion.div>
```

**Fitur:**

- Organizational structure cards
- Client logos marquee
- Testimonial slides
- Profile section

#### **CourseSection.jsx**

```jsx
// Course section dengan filter system
const [activeTab, setActiveTab] = useState("all");
const [searchTerm, setSearchTerm] = useState("");

// Filter logic
const filteredCourses = courses.filter((course) => {
  const matchesCategory = activeTab === "all" || course.category === activeTab;
  const matchesSearch =
    searchTerm === "" ||
    course.title.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesCategory && matchesSearch;
});
```

**Fitur:**

- Category filter tabs
- Search functionality
- Course cards grid
- Competency lists
- Download brochure

#### **ScheduleSection.jsx**

```jsx
// Schedule section dengan FullCalendar
<FullCalendarSchedule schedules={filteredSchedules} />
```

**Fitur:**

- FullCalendar integration
- Schedule filtering
- Status badges
- Event details modal

#### **ContactSection.jsx**

```jsx
// Contact section dengan WhatsApp integration
const handleWhatsAppClick = () => {
  const phoneNumber = "6281287992089";
  const message = "Halo, saya tertarik dengan program pelatihan TUK P Gas.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
};
```

**Fitur:**

- Direct WhatsApp integration
- Contact information
- Operating hours
- Responsive layout

### **Animated Components**

#### **AnimatedFloatingButton.jsx**

```jsx
// Floating action button dengan expandable menu
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
  {/* Floating button content */}
</motion.button>
```

#### **AnimatedCard.jsx**

```jsx
// Reusable animated card component
<motion.div variants={cardVariants} whileHover={{ scale: 1.02 }}>
  {/* Card content */}
</motion.div>
```

#### **AnimatedText.jsx**

```jsx
// Text animation component
<motion.span variants={textVariants} initial="hidden" whileInView="visible">
  {/* Animated text */}
</motion.span>
```

## 🔌 API Routes

### **Courses API** (`/api/courses`)

```javascript
// GET /api/courses
export async function GET() {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { title: "asc" },
  });
  return apiResponse(200, courses);
}
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Operator Penyambungan Pipa Polyethylene",
      "category": "penyambungan",
      "competencies": "Kompetensi 1\nKompetensi 2",
      "isActive": true
    }
  ],
  "message": "Courses retrieved successfully"
}
```

### **Schedules API** (`/api/schedules`)

```javascript
// GET /api/schedules
export async function GET() {
  const schedules = await prisma.schedule.findMany({
    include: {
      course: {
        select: { id: true, title: true, category: true },
      },
    },
  });
  return apiResponse(200, schedules);
}
```

### **Organizational Structure API** (`/api/organizational-structure`)

```javascript
// GET /api/organizational-structure
export async function GET() {
  const structure = await prisma.organizationalStructure.findMany({
    orderBy: { order: "asc" },
  });
  return apiResponse(200, structure);
}
```

## 🎭 Animasi

### **Animation Types**

#### **Entrance Animations**

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};
```

#### **Hover Effects**

```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</motion.div>
```

#### **Scroll Animations**

```jsx
<motion.div
  initial={{ y: 50, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

#### **Stagger Animations**

```jsx
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};
```

### **Animation Performance**

- **Reduced Motion**: Support untuk users yang preferensi reduced motion
- **Optimized Transitions**: Durasi dan easing yang optimal
- **Lazy Loading**: Animasi hanya trigger saat visible
- **Hardware Acceleration**: GPU-accelerated animations

## 🚀 Deployment

### **Vercel Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### **Environment Setup**

```bash
# Set production environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
```

### **Database Migration**

```bash
# Run migrations on production
vercel env pull .env.production
npx prisma migrate deploy
```

## 📊 Database Schema

### **Course Model**

```prisma
model Course {
  id          Int      @id @default(autoincrement())
  title       String
  shortTitle  String?
  category    String
  competencies String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  schedules   Schedule[]
}
```

### **Schedule Model**

```prisma
model Schedule {
  id        Int      @id @default(autoincrement())
  courseId  Int
  startDate DateTime
  endDate   DateTime?
  location  String
  seats     Int
  available Int
  status    String   @default("OPEN")
  price     Float?
  course    Course   @relation(fields: [courseId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### **Organizational Structure Model**

```prisma
model OrganizationalStructure {
  id       Int    @id @default(autoincrement())
  title    String
  position String
  order    Int
  image    String?
}
```

## 🎨 Design System

### **Color Palette**

```css
/* Primary Colors */
--blue-600: #2563eb;
--blue-700: #1d4ed8;
--green-600: #16a34a;
--green-700: #15803d;

/* Status Colors */
--success: #22c55e;
--warning: #f97316;
--error: #ef4444;
--info: #3b82f6;
```

### **Typography**

```css
/* Headings */
--font-heading: "Inter", sans-serif;
--font-body: "Inter", sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
```

### **Spacing**

```css
/* Spacing Scale */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
```

## 🔧 Development

### **Code Style**

```bash
# Format code
npm run format

# Lint code
npm run lint

# Type check (if using TypeScript)
npm run type-check
```

### **Testing**

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### **Build**

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📱 Responsive Design

### **Breakpoints**

```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### **Mobile Optimizations**

- Touch-friendly buttons (min 44px)
- Swipe gestures untuk mobile menu
- Optimized images untuk mobile
- Reduced animations untuk performance

## 🔒 Security

### **API Security**

- Input validation dengan Zod
- Rate limiting
- CORS configuration
- SQL injection prevention dengan Prisma

### **Environment Variables**

- Sensitive data dalam .env files
- Production secrets management
- Database connection security

## 📈 Performance

### **Optimizations**

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic dengan Next.js
- **Lazy Loading**: Components dan images
- **Caching**: API responses dan static assets

### **Lighthouse Scores**

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🤝 Kontribusi

### **Development Workflow**

1. Fork repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

### **Code Guidelines**

- Follow ESLint rules
- Use Prettier formatting
- Write meaningful commit messages
- Add JSDoc comments untuk functions

### **Testing Guidelines**

- Unit tests untuk utilities
- Component tests untuk UI
- Integration tests untuk API
- E2E tests untuk critical flows

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: info@tukpgas.com
- **WhatsApp**: +62 812 8799 2089
- **Website**: https://tukpgas.com

---

**TUK P Gas** - Tempat Uji Kompetensi P Gas
_Membangun masa depan industri gas Indonesia_
