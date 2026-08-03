import { Share2, Heart, Play, Users, MapPin, MessageSquare, MessageCircle, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#071426] text-white">
      <div className="border-b border-slate-700/50 px-4 py-6 sm:px-6 lg:px-0">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap gap-3">
          {["Explore Travel World", "India Tour Packages", "World Tour Packages", "FIT Tourism", "Specialty Tours"].map((pill) => (
            <button
              key={pill}
              className="rounded-full border border-slate-500/30 px-4 py-2 text-[12px] font-semibold text-white transition hover:border-[#60A5FA] hover:text-[#60A5FA]"
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-700/50 px-4 py-10 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="font-bold text-white">DISCOVER US</h4>
              <ul className="mt-3 space-y-2 text-[12px] text-slate-300">
                <li><a href="#" className="hover:text-[#60A5FA]">About Travel World</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">About us</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Our Team</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Tour Managers</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Sales Partners</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Corporate Travel</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white">SUPPORT</h4>
              <ul className="mt-3 space-y-2 text-[12px] text-slate-300">
                <li><a href="#" className="hover:text-[#60A5FA]">Contact us</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Leave your Feedback</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">How to Book</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">FAQ</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Pay Online</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Travel Updates</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Request Visa</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white">RESOURCES</h4>
              <ul className="mt-3 space-y-2 text-[12px] text-slate-300">
                <li><a href="#" className="hover:text-[#60A5FA]">Tour Status</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Blog</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Podcasts</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Video Blogs</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Articles</a></li>
                <li><a href="#" className="hover:text-[#60A5FA]">Travel Planner</a></li>
              </ul>
            </div>

            <div>
              <p className="text-[14px] font-bold">TRAVEL WORLD</p>
              <p className="mt-2 text-[12px] text-slate-300">
                Explore the beautiful World with trusted travel experiences.
              </p>
              <div className="mt-4">
                <p className="text-[11px] font-semibold text-slate-400">Newsletter</p>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="mt-2 w-full rounded-[6px] border border-slate-600 bg-slate-800/50 px-3 py-2 text-[11px] text-white placeholder:text-slate-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-2 w-full rounded-[6px] border border-slate-600 bg-slate-800/50 px-3 py-2 text-[11px] text-white placeholder:text-slate-500"
                />
                <button className="mt-2 w-full rounded-[6px] bg-[#2563EB] py-2 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-700/50 px-4 py-6 sm:px-6 lg:px-0">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap justify-center gap-6 text-[12px] text-slate-300">
          <a href="#" className="flex items-center gap-2 hover:text-[#60A5FA]">
            <MapPin className="h-4 w-4" />
            Locate Us
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#60A5FA]">
            <MessageSquare className="h-4 w-4" />
            Request a Quote
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#60A5FA]">
            <MessageCircle className="h-4 w-4" />
            For Feedback
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#60A5FA]">
            <HelpCircle className="h-4 w-4" />
            For Enquiries
          </a>
        </div>
      </div>

      <div className="px-4 py-8 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-[11px] text-slate-400">
              © 2026 Travel World. All rights reserved. | Privacy Policy | Terms & Conditions
            </div>
            <div className="flex gap-4">
              <a href="#" className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-[#2563EB] hover:text-white">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-[#2563EB] hover:text-white">
                <Heart className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-[#2563EB] hover:text-white">
                <Play className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-[#2563EB] hover:text-white">
                <Users className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
