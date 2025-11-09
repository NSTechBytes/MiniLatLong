# MiniLatlong 📍

A modern, fast, and user-friendly web application to find latitude and longitude coordinates for any city in the world.

## ✨ Features

- 🔍 **Quick Search** - Find coordinates for any city instantly
- 🗺️ **Interactive Map** - Visualize locations with integrated map view
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable viewing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - Built with Next.js 15 and optimized for performance
- 🎨 **Modern UI** - Clean interface with Tailwind CSS and Radix UI components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NSTechBytes/MiniLatLong.git
cd MiniLatLong
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI primitives
- **Maps:** React Map GL (Mapbox/Maplibre)
- **Icons:** Lucide React
- **Theme:** next-themes
- **Forms:** React Hook Form + Zod validation

## 📦 Build for Production

```bash
npm run build
```

This generates a static site in the `out` folder.

## 🌐 Deployment

### Cloudflare Pages

1. Build command: `npm run build`
2. Output directory: `out`
3. Upload the `out` folder to Cloudflare Pages

### Local Preview

After building, preview the production build:
```bash
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server on port 9002
- `npm run build` - Build for production
- `npm start` - Serve production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**NSTechBytes**
- GitHub: [@NSTechBytes](https://github.com/NSTechBytes)

---

Made with ❤️ by NSTechBytes
