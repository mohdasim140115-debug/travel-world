import { Share2, Heart, Play, Users, MapPin, MessageSquare, MessageCircle, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#082C4B] text-white">
      <div className="border-b border-slate-700/50 px-3 py-6 sm:px-6 lg:px-0">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap gap-3">
          {["Explore Travel World", "India Tour Packages", "World Tour Packages", "FIT Tourism", "Specialty Tours"].map((pill) => (
            <button
              key={pill}
              className="rounded-full border border-slate-500/30 px-4 py-2 text-[12px] font-semibold text-[#CBD5E1] transition hover:border-[#A9D8F0] hover:text-[#A9D8F0]"
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-700/50 px-3 py-10 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="font-bold text-white">DISCOVER US</h4>
              <ul className="mt-3 space-y-2 text-[12px] text-[#94A3B8]">
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">About Travel World</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">About us</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Our Team</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Tour Managers</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Sales Partners</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Corporate Travel</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white">SUPPORT</h4>
              <ul className="mt-3 space-y-2 text-[12px] text-[#94A3B8]">
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Contact us</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Leave your Feedback</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">How to Book</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">FAQ</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Pay Online</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Travel Updates</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Request Visa</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white">RESOURCES</h4>
              <ul className="mt-3 space-y-2 text-[12px] text-[#94A3B8]">
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Tour Status</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Blog</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Podcasts</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Video Blogs</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Articles</a></li>
                <li><a href="#" className="text-[#CBD5E1] hover:text-[#A9D8F0]">Travel Planner</a></li>
              </ul>
            </div>

            <div>
              <p className="text-[14px] font-bold">TRAVEL WORLD</p>
              <p className="mt-2 text-[12px] text-[#94A3B8]">
                Explore the beautiful World with trusted travel experiences.
              </p>
              <div className="mt-4">
                <p className="text-[11px] font-semibold text-[#94A3B8]/70">Newsletter</p>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-800/50 px-3 py-2 text-[11px] text-white placeholder:text-slate-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-800/50 px-3 py-2 text-[11px] text-white placeholder:text-slate-500"
                />
                <button className="mt-2 w-full rounded-xl bg-[#FF7A1A] py-2 text-[11px] font-bold text-white transition hover:bg-[#E56A0F]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-700/50 px-3 py-6 sm:px-6 lg:px-0">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap justify-center gap-6 text-[12px] text-[#94A3B8]">
          <a href="#" className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#A9D8F0]">
            <MapPin className="h-4 w-4" />
            Locate Us
          </a>
          <a href="#" className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#A9D8F0]">
            <MessageSquare className="h-4 w-4" />
            Request a Quote
          </a>
          <a href="#" className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#A9D8F0]">
            <MessageCircle className="h-4 w-4" />
            For Feedback
          </a>
          <a href="#" className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#A9D8F0]">
            <HelpCircle className="h-4 w-4" />
            For Enquiries
          </a>
        </div>
      </div>

      <div className="px-3 py-8 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-[11px] text-[#94A3B8]/70">
              © 2026 Travel World. All rights reserved. | Privacy Policy | Terms & Conditions
            </div>
            <div className="flex gap-4">
              <a href="#" className="rounded-full bg-slate-800 p-2 text-[#94A3B8] transition hover:bg-[#A9D8F0] hover:text-[#082C4B]">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 text-[#94A3B8] transition hover:bg-[#A9D8F0] hover:text-[#082C4B]">
                <Heart className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 text-[#94A3B8] transition hover:bg-[#A9D8F0] hover:text-[#082C4B]">
                <Play className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2 text-[#94A3B8] transition hover:bg-[#A9D8F0] hover:text-[#082C4B]">
                <Users className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
