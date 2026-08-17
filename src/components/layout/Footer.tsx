import Link from "next/link";
import { Mail, MapPin, Phone, PawPrint } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-emerald-100 bg-emerald-900 text-emerald-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-center sm:grid-cols-2 sm:py-12 sm:text-left lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-4 flex items-center justify-center gap-2 font-bold sm:justify-start">
            <PawPrint className="h-6 w-6 text-orange-400" />
            Pawfect Pets
          </div>
          <p className="mx-auto max-w-xs text-sm text-emerald-100 sm:mx-0">
            Your neighborhood pet shop for quality products, grooming, and care.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li><Link href="/shop" className="inline-block py-1 hover:text-white">Shop</Link></li>
            <li><Link href="/services" className="inline-block py-1 hover:text-white">Services</Link></li>
            <li><Link href="/about" className="inline-block py-1 hover:text-white">About</Link></li>
            <li><Link href="/contact" className="inline-block py-1 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Store Hours</h3>
          <ul className="space-y-1 text-sm text-emerald-100">
            <li>Mon–Fri: 9am – 7pm</li>
            <li>Saturday: 9am – 6pm</li>
            <li>Sunday: 10am – 4pm</li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="mb-3 font-semibold">Contact</h3>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li className="flex items-start justify-center gap-2 sm:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>123 Pet Lane, Mumbai, MH</span>
            </li>
            <li className="flex items-center justify-center gap-2 sm:justify-start">
              <Phone className="h-4 w-4 shrink-0" />
              (512) 555-PETS
            </li>
            <li className="flex items-center justify-center gap-2 sm:justify-start">
              <Mail className="h-4 w-4 shrink-0" />
              hello@pawfectpets.com
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-emerald-800 px-4 py-4 text-center text-sm text-emerald-200">
        © {new Date().getFullYear()} Pawfect Pets. All rights reserved.
      </div>
    </footer>
  );
}
