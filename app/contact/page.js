export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
        LET'S WORK <br />
        <span className="text-neutral-600">TOGETHER.</span>
      </h1>

      <div className="space-y-6 text-lg md:text-xl font-light">
        <p>
          Based in <span className="text-yellow-500">India</span>.
          <br />Available for weddings, portraits, and commercial projects.
        </p>

        <div className="flex flex-col gap-4 mt-8">
          <a 
            href="mailto:photographermohitsingh@gmail.com" 
            className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-neutral-200 transition"
          >
            Send an Email
          </a>
          
          <a 
            href="https://www.instagram.com/mohit_singh_no.1_photographer" 
            target="_blank"
            className="border border-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition"
          >
            Instagram
          </a>
        </div>
      </div>

    </main>
  );
}