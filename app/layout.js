// import './globals.css'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Mohit Singh Photographer',
//   description: 'Portfolio',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }


import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Import the new footer

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mohit Singh Photographer',
  description: 'Portfolio of Mohit Singh',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        
        {/* --- GLOBAL NAVIGATION --- */}
        <nav className="p-8 flex justify-between items-center uppercase tracking-widest border-b border-neutral-800 bg-black sticky top-0 z-50">
          <Link href="/" className="text-2xl font-bold">
            Mohit Singh
          </Link>
          
          <div className="space-x-6 text-sm text-neutral-400">
            <Link href="/" className="hover:text-white transition">Work</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </nav>

        {/* --- PAGE CONTENT --- */}
        {children}

        {/* --- GLOBAL FOOTER --- */}
        <Footer />
        
      </body>
    </html>
  );
}