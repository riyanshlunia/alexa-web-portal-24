import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface DomainCardProps {
  title: string;
  description: string;
  colorClass: string;
  carSrc?: string;
  carClass?: string;
  icon: ReactNode;
  bgSvg?: string;
  mobileBgSvg?: string;
  reverse?: boolean;
}

function DomainCard({
  title,
  description,
  colorClass,
  carSrc,
  carClass,
  icon,
  bgSvg,
  mobileBgSvg,
  reverse = false,
}: DomainCardProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-[270px] sm:w-[290px] flex-col items-center pb-20 pt-[290px] md:h-[575px] md:w-full md:max-w-[1283px] md:flex-row md:justify-between md:p-8 md:px-24 md:pt-8",
        reverse && "md:flex-row-reverse"
      )}
    >
      {/* Desktop Background */}
      {bgSvg && (
        <div className="absolute inset-0 z-0 hidden md:block">
          <img
            src={bgSvg}
            alt="Desktop Card Background"
            className="h-full w-full object-fill"
          />
          {/* Gradient Overlay for alternating fade effect */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none",
              reverse
                ? "bg-gradient-to-r from-black from-5% via-black/80 via-30% to-transparent to-60%"
                : "bg-gradient-to-l from-black from-5% via-black/80 via-30% to-transparent to-60%"
            )}
          />
        </div>
      )}

      {/* Mobile Background & Fallback */}
      <div className="absolute inset-0 z-0 block md:hidden">
        {mobileBgSvg ? (
          <img
            src={mobileBgSvg}
            alt="Mobile Card Background"
            className="h-full w-full object-fill"
          />
        ) : (
          <div
            className={cn(
              "h-full w-full rounded-[45px] p-[2px]",
              reverse
                ? "bg-gradient-to-bl from-white/50 to-transparent"
                : "bg-gradient-to-br from-white/50 to-transparent"
            )}
          >
            <div className="h-full w-full rounded-[43px] bg-black" />
          </div>
        )}
      </div>

      {/* Left Side (Car + Tyre) */}
      <div
        className={cn(
          "relative z-10 w-full items-center justify-center md:mt-[60px] md:w-[420px]",
          mobileBgSvg ? "hidden md:flex" : "absolute left-0 top-12 flex md:relative md:top-auto md:flex"
        )}
      >
        {/* F1 Car (Hidden on Mobile) */}
        {carSrc && (
          <div
            className={cn(
              "absolute z-20 hidden md:block",
              reverse
                ? "right-0 -top-[90px] w-[300px] sm:-top-[110px] sm:w-[360px]"
                : "left-0 -top-[90px] w-[300px] sm:-top-[110px] sm:w-[360px]",
              carClass
            )}
          >
            <img
              src={carSrc}
              alt={`${title} car`}
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        {/* Tyre */}
        <div
          className={cn(
            "flex items-center justify-center",
            "h-[150px] w-[150px] md:h-[290px] md:w-[290px]",
            reverse ? "md:translate-x-8" : "md:-translate-x-8"
          )}
        >
          {icon}
        </div>
      </div>

      {/* Text */}
      <div
        className={cn(
          "relative z-10 flex w-full flex-col gap-3 px-6 md:mt-[60px] md:max-w-[820px] md:gap-10 md:px-0",
          "items-center text-center",
          reverse
            ? "md:items-start md:text-left md:pl-12"
            : "md:items-end md:text-right md:pr-12"
        )}
      >
        <h2
          className={cn(
            "text-[28px] tracking-tight md:text-[68.64px] md:leading-none",
            colorClass
          )}
          style={{ fontFamily: 'Formula1, sans-serif', fontWeight: 500 }}
        >
          {title}
        </h2>

        <p
          className={cn(
            "w-full text-[12px] leading-[1.4] text-[#e0e0e0] sm:text-sm md:text-[34.32px] md:leading-none",
            reverse ? "md:text-left" : "md:text-right"
          )}
          style={{ fontFamily: 'Formula1, sans-serif', fontWeight: 400 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

const DomainSection: React.FC = () => {
  const domains = [
    {
      title: 'Technical',
      description:
        'The Technical domain brings ideas to life through programming, innovation, and collaborative problem-solving, empowering members to build impactful applications while advancing their technical expertise with modern technologies.',
      carSrc: '/recruitments26/f1-technical.svg',
      tyreSrc: '/recruitments26/tyre-technical.svg',
      colorClass: 'text-[#E51E26]',
      bgSvg: '/recruitments26/Rectangle 174.svg',
      mobileBgSvg: '/recruitments26/tech (1).svg',
      carClass: 'md:-top-[310px] md:left-16 md:w-[420px]',
    },
    {
      title: 'Creatives',
      description:
        'The Creatives domain gives the club its voice and identity, transforming ideas into compelling narratives and purposeful design that reflect the club\'s vision with creativity, clarity, and elegance.',
      carSrc: '/recruitments26/f1-creatives.svg',
      tyreSrc: '/recruitments26/tyre-creatives.svg',
      colorClass: 'text-white',
      bgSvg: '/recruitments26/Rectangle 173.svg',
      mobileBgSvg: '/recruitments26/creatives.svg',
      carClass: 'md:-top-[320px] md:-right-0 md:w-[540px]',
    },
    {
      title: 'Business',
      description:
        'The Business domain builds meaningful partnerships through strategic networking, purposeful outreach, and valued sponsorships, expanding the club\'s reach while creating opportunities that strengthen its vision and impact.',
      carSrc: '/recruitments26/f1-business.svg',
      tyreSrc: '/recruitments26/tyre-business.svg',
      colorClass: 'text-[#FFD21A]',
      bgSvg: '/recruitments26/Rectangle 174.svg',
      carClass: 'md:-top-[290px] md:left-16 md:w-[420px]',
    },
    {
      title: 'Events',
      description:
        'The Events domain transforms vision into memorable experiences through thoughtful planning and seamless execution, fostering meaningful engagement while shaping the moments that define the club\'s culture.',
      carSrc: '/recruitments26/f1-events.svg',
      tyreSrc: '/recruitments26/tyre-events.svg',
      colorClass: 'text-[#1E67C7]',
      bgSvg: '/recruitments26/Rectangle 173.svg',
      carClass: 'md:-top-[290px] md:right-8 md:w-[420px]',
    },
  ];

  return (
    <div
      id="domain"
      className="relative min-h-screen bg-black px-4 py-10 font-sans sm:px-6 md:px-8 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1283px]">
        <div className="mb-32 text-center md:mb-[210px]">
          <h2
            className="m-0 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-[56px]"
            style={{ fontFamily: 'Formula1, sans-serif' }}
          >
            Our <span className="text-[#E51E26]">Domains</span>
          </h2>
        </div>

        <div className="relative z-10 flex flex-col gap-20 md:gap-32">
          {domains.map((domain, index) => {
            const isEven = index % 2 === 0;

            return (
              <DomainCard
                key={domain.title}
                title={domain.title}
                description={domain.description}
                colorClass={domain.colorClass}
                carSrc={domain.carSrc}
                carClass={domain.carClass}
                bgSvg={domain.bgSvg}
                icon={
                  <img
                    src={domain.tyreSrc}
                    alt={`${domain.title} tyre icon`}
                    className="h-full w-full object-contain"
                  />
                }
                reverse={!isEven}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DomainSection;
