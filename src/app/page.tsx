import { LocationFinder } from '@/components/location-finder';
import { ThemeToggle } from '@/components/theme-toggle';

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <MapPinIcon className="h-6 w-6 text-accent" />
              <span className="font-bold text-lg">MiniLatlong</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <a
              href="https://github.com/NSTechBytes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <LocationFinder />
      </main>

      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Crafted by{' '}
            <a
              href="https://github.com/NSTechBytes"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              NSTechBytes
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
