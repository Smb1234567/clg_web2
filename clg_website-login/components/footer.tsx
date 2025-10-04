import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* College Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">GSKSJTI Engineering College Bengaluru-560001     </h3>
            <p className="text-blue-100 mb-4">
              Since 1995.        
            </p>
            <div className="space-y-2 text-sm text-blue-100">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Engineering Road, Tech City, TC 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 9945430656  </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@gasksjti.ac.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/departments" className="block text-blue-100 hover:text-white transition-colors">
                Departments
              </Link>
              <Link href="/announcements" className="block text-blue-100 hover:text-white transition-colors">
                Announcements
              </Link>
              <Link href="/events" className="block text-blue-100 hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/notes" className="block text-blue-100 hover:text-white transition-colors">
                Study Notes
              </Link>
              <Link href="/contact" className="block text-blue-100 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; 2024 Sunrise College of Engineering. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
