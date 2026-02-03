import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800 mt-12">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Copyright */}
        <div className="text-sm">
          © {new Date().getFullYear()} Mohit Singh. All rights reserved.
        </div>

        {/* Center: Social Links */}
        <div className="flex gap-6">
          <a 
            href="https://www.instagram.com/mohit_singh_no.1_photographer" 
            target="_blank" 
            className="hover:text-white transition uppercase tracking-widest text-sm font-bold"
          >
            Instagram
          </a>
          <a 
            href="mailto:photographermohitsingh@gmail.com" 
            className="hover:text-white transition uppercase tracking-widest text-sm font-bold"
          >
            Email Me
          </a>
        </div>

        {/* Right: Admin Link (Subtle) */}
        <div>
          <Link href="/admin" className="text-neutral-700 hover:text-neutral-500 text-xs">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}