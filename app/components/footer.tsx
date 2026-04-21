import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import brand from "@/config/brand";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span
                style={{
                  background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {brand.company.name}
              </span>
            </h3>
            <p className="text-gray-400 mb-4">
              {brand.company.description}
            </p>
            <div className="flex gap-4">
              {brand.social.facebook && (
                <a href={brand.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {brand.social.instagram && (
                <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {brand.social.linkedin && (
                <a href={brand.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {brand.social.twitter && (
                <a href={brand.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {brand.social.youtube && (
                <a href={brand.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {brand.navigation.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {brand.footer.links.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {brand.company.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{brand.company.address}</span>
                </li>
              )}
              {brand.company.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{brand.company.phone}</span>
                </li>
              )}
              {brand.company.email && (
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{brand.company.email}</span>
                </li>
              )}
              {brand.support.hours && (
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{brand.support.hours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {brand.footer.copyright}
            </p>
            <div className="flex gap-6 text-sm">
              {brand.footer.links.legal.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
