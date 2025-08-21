"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";

const socialLinks = [
  {
    title: "DDC Github",
    description: "Check out our open source projects and contribute",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-yellow-400"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    url: "https://www.devdotcom.in/",
  },
  {
    title: "DDC Website",
    description: "Join our community channel for discussions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-yellow-400"
      >
        <path d="M18 6h0a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h12Z" />
        <path d="M18 16h0a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h12Z" />
        <path d="M10 6V3" />
        <path d="M14 6V3" />
        <path d="M10 21v-3" />
        <path d="M14 21v-3" />
        <path d="M6 12h12" />
      </svg>
    ),
    url: "https://www.devdotcom.in/",
  },
  {
    title: "DDC LinkedIn",
    description: "Connect with us professionally",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-yellow-400"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    url: "https://www.linkedin.com/company/devdotcom/posts/?feedView=all",
  },
];

const WebpageCards = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {socialLinks.map((link) => (
          <div
            key={link.title}
            className="h-[24rem] flex items-center justify-center"
          >
            <PinContainer title={link.title} href={link.url}>
              <div className="flex basis-full flex-col p-6 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] rounded-lg bg-black/30 border border-yellow-500/20">
                <div className="flex items-center gap-4 mb-4">
                  {React.cloneElement(link.icon, {
                    className: "h-8 w-8 text-yellow-400",
                  })}
                  <h3 className="font-bold text-xl text-yellow-400">
                    {link.title}
                  </h3>
                </div>
                <div className="text-base font-normal">
                  <span className="text-gray-400">{link.description}</span>
                </div>
                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-yellow-400/20 via-yellow-500/10 to-yellow-600/5" />
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebpageCards;
