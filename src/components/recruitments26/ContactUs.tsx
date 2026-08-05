"use client";

import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function ContactUs() {
  return (
    <section id="contact" className="relative w-full overflow-hidden bg-black px-4 py-16 sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1283px]">
        {/* Red Line Divider */}
        <div className="mb-16 h-[2px] w-full bg-[#E51E26]" />

        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-16 lg:px-4">
          
          {/* Left side - Embrace the FUTURE */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 
              className="text-2xl font-semibold tracking-wide text-white sm:text-3xl md:text-[32px] md:leading-none"
              style={{ fontFamily: 'Formula1, sans-serif' }}
            >
              Embrace the
            </h2>
            <h1 
              className="mt-2 text-5xl font-black tracking-tight text-[#E51E26] sm:text-6xl md:text-[80px] md:leading-none"
              style={{ fontFamily: 'Formula1, sans-serif' }}
            >
              FUTURE.
            </h1>
          </div>

          {/* Right side - Contact Information */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <p 
              className="text-lg font-semibold tracking-wide text-white sm:text-xl"
              style={{ fontFamily: 'Formula1, sans-serif' }}
            >
              Got any queries? Contact us at
            </p>

            <div className="flex flex-col items-center gap-5 lg:items-start">
              {/* Instagram Contact */}
              <a 
                href="https://www.instagram.com/alexadevsrm/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-white transition-colors duration-300 hover:text-[#E51E26]"
              >
                <Instagram className="h-6 w-6 text-[#E51E26] transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-semibold tracking-wide sm:text-base" style={{ fontFamily: 'Formula1, sans-serif' }}>
                  alexadevsrm
                </span>
              </a>
              
              {/* Email Contact */}
              <a 
                href="mailto:hello@alexadevsrm.com"
                className="group flex items-center gap-4 text-white transition-colors duration-300 hover:text-[#E51E26]"
              >
                <Mail className="h-6 w-6 text-[#E51E26] transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-semibold tracking-wide sm:text-base" style={{ fontFamily: 'Formula1, sans-serif' }}>
                  hello@alexadevsrm.com
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
