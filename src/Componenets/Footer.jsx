// src/components/Footer.jsx
import React from "react";
import Logo from '/src/assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#122033] text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left: Logo + description */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-10 w-24 mb-6" />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Empowering learners through accessible and engaging online education.
              Byway is a leading online learning platform dedicated to providing
              high-quality, flexible, and affordable educational experiences.
            </p>
          </div>

          {/* Column 1: Get Help */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Get Help</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#contact">Contact Us</a></li>
              <li><a className="hover:text-white" href="#articles">Latest Articles</a></li>
              <li><a className="hover:text-white" href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Column 2: Programs */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Programs</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#art">Art & Design</a></li>
              <li><a className="hover:text-white" href="#business">Business</a></li>
              <li><a className="hover:text-white" href="#it">IT & Software</a></li>
              <li><a className="hover:text-white" href="#languages">Languages</a></li>
              <li><a className="hover:text-white" href="#programming">Programming</a></li>
            </ul>
          </div>

          {/* Column 3: Contact + social */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact Us</h3>

            <address className="not-italic text-sm text-slate-300 space-y-2">
              <div>Address: 123 Main Street, Anytown, CA 12345</div>
              <div>Tel: +1 (123) 456-7890</div>
              <div>Mail: bywayedu@webkul.in</div>
            </address>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4">
              {/* Example social links — set href to your real profiles */}
              <a
                href="#facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/6 hover:bg-white/10"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" aria-hidden></i>
              </a>

              <a
                href="#github"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/6 hover:bg-white/10"
                aria-label="GitHub"
              >
                <i className="fab fa-github" aria-hidden></i>
              </a>

              <a
                href="#google"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/6 hover:bg-white/10"
                aria-label="Google"
              >
                <i className="fab fa-google" aria-hidden></i>
              </a>

              <a
                href="#x"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/6 hover:bg-white/10"
                aria-label="X"
              >
                <i className="fab fa-x-twitter" aria-hidden></i>
              </a>

              <a
                href="#microsoft"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/6 hover:bg-white/10"
                aria-label="Microsoft"
              >
                <i className="fab fa-microsoft" aria-hidden></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom small text */}
        <div className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-400 flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} Byway. All rights reserved.</div>
          <div className="mt-3 md:mt-0">
            <a className="px-2 hover:text-white" href="#terms">Terms</a>
            <a className="px-2 hover:text-white" href="#privacy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
