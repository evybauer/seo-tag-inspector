# TagSnippet - SEO Meta Tag Analyzer

A professional web application for analyzing and optimizing website SEO meta tags, Open Graph, Twitter Cards, and more. Get actionable recommendations to improve your search rankings and social media presence.

## 🚀 Features

- **Instant SEO Analysis** - Analyze any website URL in seconds
- **Comprehensive Meta Tag Review** - Check title, description, Open Graph, Twitter Cards, canonical URLs, and more
- **SEO Scoring System** - Get a score out of 100 with detailed breakdown:
  - Search Optimization (50 points)
  - Social Preview Readiness (30 points)
  - Technical Tags & Structure (20 points)
- **Live Previews** - See how your page appears on Google and social media platforms
- **Actionable Recommendations** - Get specific suggestions for improvement
- **Export Options** - Download results as PDF or JSON
- **Share Analysis** - Share your analysis results via URL
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **HTML Parsing**: Cheerio
- **PDF Generation**: jsPDF
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/seo-tag-inspector.git
   cd seo-tag-inspector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Enter a URL** - Paste any website URL into the input field
2. **Analyze** - Click "Analyze" to start the SEO analysis
3. **Review Results** - Check your SEO score and detailed breakdown
4. **View Recommendations** - Get actionable suggestions for improvement
5. **Export or Share** - Download results or share via URL

## 📊 Analysis Components

### SEO Score Breakdown
- **Search Optimization (50 pts)**: Title, description, H1 tags, canonical URLs
- **Social Preview (30 pts)**: Open Graph tags, Twitter Cards, social media optimization
- **Technical Structure (20 pts)**: Robots meta, structured data, technical SEO elements

### Meta Tags Analyzed
- Page title and description
- Open Graph tags (og:title, og:description, og:image, etc.)
- Twitter Card tags (twitter:card, twitter:title, etc.)
- Canonical URLs
- Robots meta tags
- H1 heading tags
- Structured data markup

## 🔧 Development

### Project Structure
```
seo-tag-inspector/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript definitions
├── public/                # Static assets
└── package.json
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- HTML parsing with [Cheerio](https://cheerio.js.org/)

---

**TagSnippet** - Professional SEO analysis made simple.
