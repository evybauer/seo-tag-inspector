# [TagSnippet](https://seo-tag-inspector-six.vercel.app/) - SEO Toolbox

A comprehensive web application for analyzing and optimizing website SEO performance. Get actionable recommendations to improve your search rankings, social media presence, and technical SEO setup.

## 🚀 Features

### 🔍 SEO Analysis
- **Instant SEO Analysis** - Analyze any website URL in seconds
- **Comprehensive Meta Tag Review** - Check title, description, Open Graph, Twitter Cards, canonical URLs, and more
- **SEO Scoring System** - Get a score out of 100 with detailed breakdown:
  - Search Optimization (50 points)
  - Social Preview Readiness (30 points)
  - Technical Tags & Structure (20 points)
- **Live Previews** - See how your page appears on Google, Facebook, and Twitter
- **Actionable Recommendations** - Get specific suggestions for improvement
- **Export Options** - Download results as PDF or JSON
- **Share Analysis** - Share your analysis results via URL

### 🏷️ Meta Tag Generator
- **Comprehensive Meta Tags** - Generate title, description, keywords, robots, and canonical URLs
- **Open Graph Tags** - Create optimized social media preview tags
- **Twitter Card Tags** - Generate Twitter-specific meta tags
- **Live Preview** - See how your meta tags appear in search results
- **Copy & Download** - Easy export of generated HTML code

### 🔑 Keyword Generator
- **Content Analysis** - Extract keywords from your content
- **Keyword Categories** - Primary, long-tail, question-based, and local keywords
- **Relevance Scoring** - Get keyword relevance percentages
- **Content Statistics** - Word count, readability score, and keyword density
- **Export Options** - Copy keywords or download as CSV

### 🤖 Robots.txt Generator
- **Search Engine Control** - Configure crawling for Google, Bing, Yahoo, and more
- **User Agent Rules** - Set specific rules for different bots
- **Directory Management** - Control access to specific folders
- **Crawl Delay Settings** - Manage bot crawling frequency
- **Sitemap Integration** - Add sitemap references
- **Advanced Options** - Custom rules and templates

### ⚙️ .htaccess Generator
- **Error Page Configuration** - Set up custom 404, 500, and other error pages
- **Security Headers** - Add security and performance headers
- **Redirect Management** - Create 301 and 302 redirects
- **IP Control** - Allow or deny specific IP addresses
- **Compression & Caching** - Enable Gzip compression and browser caching
- **Directory Protection** - Control directory listings and access

### 🗺️ XML Sitemap Generator
- **Domain Configuration** - Set up your website domain
- **Page Count Control** - Specify how many pages to include
- **Priority Settings** - Set page priorities (0.0 to 1.0)
- **Change Frequency** - Configure update frequency for search engines
- **Modified Dates** - Include last modification dates
- **Export Options** - Download generated sitemap.xml

### 🎨 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with consistent styling
- **Toast Notifications** - User-friendly feedback for actions
- **Loading States** - Smooth transitions and progress indicators
- **Error Handling** - Clear error messages and validation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
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

### SEO Analysis
1. **Navigate to SEO Analysis** - Go to `/seo-analysis` or use the main page
2. **Enter a URL** - Paste any website URL into the input field
3. **Analyze** - Click "Analyze SEO" to start the analysis
4. **Review Results** - Check your SEO score and detailed breakdown
5. **View Detailed Report** - Click to see comprehensive analysis
6. **Export or Share** - Download results or share via URL

### Meta Tag Generator
1. **Go to Meta Tag Generator** - Navigate to `/meta-tag-generator`
2. **Fill in Details** - Enter page title, description, keywords, and social media info
3. **Generate Tags** - Click "Generate" to create optimized meta tags
4. **Copy or Download** - Use the generated HTML code

### Keyword Generator
1. **Access Keyword Generator** - Go to `/keyword-generator`
2. **Paste Content** - Enter your website content or text
3. **Generate Keywords** - Click "Generate" to extract keywords
4. **Review Results** - Check keyword categories and relevance scores
5. **Export Keywords** - Copy or download the keyword list

### Robots.txt Generator
1. **Open Robots.txt Generator** - Navigate to `/robots-generator`
2. **Configure Settings** - Set default behavior and crawl delays
3. **Add Directories** - Specify restricted or allowed directories
4. **Configure Bots** - Set rules for specific search engines
5. **Generate File** - Create your robots.txt file
6. **Download** - Get the generated robots.txt file

### .htaccess Generator
1. **Access .htaccess Generator** - Go to `/htaccess-generator`
2. **Choose Configuration** - Select error pages, security, redirects, etc.
3. **Configure Settings** - Set up your specific requirements
4. **Generate File** - Create your .htaccess file
5. **Download** - Get the generated .htaccess file

### XML Sitemap Generator
1. **Open XML Sitemap Generator** - Navigate to `/xml-sitemap-generator`
2. **Enter Domain** - Provide your website domain
3. **Set Parameters** - Configure page count, priorities, and frequencies
4. **Generate Sitemap** - Create your XML sitemap
5. **Download** - Get the generated sitemap.xml file

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
│   │   ├── seo-analysis/   # SEO Analysis page
│   │   ├── meta-tag-generator/ # Meta Tag Generator
│   │   ├── keyword-generator/  # Keyword Generator
│   │   ├── robots-generator/   # Robots.txt Generator
│   │   ├── htaccess-generator/ # .htaccess Generator
│   │   ├── xml-sitemap-generator/ # XML Sitemap Generator
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ToolHeader.tsx  # Reusable page headers
│   │   ├── PrimaryButton.tsx # Action buttons
│   │   ├── ActionButton.tsx # Secondary buttons
│   │   ├── Toast.tsx       # Notifications
│   │   ├── ToolNavigation.tsx # Tool navigation
│   │   └── ...            # Other components
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

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- HTML parsing with [Cheerio](https://cheerio.js.org/)

---

**TagSnippet** - Professional SEO analysis and optimization tools made simple.
