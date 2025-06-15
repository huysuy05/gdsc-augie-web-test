import Link from "next/link"
import { Facebook, Github, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">GDG Augustana</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A community of developers interested in Google developer technologies.
            </p>
            {/* <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div> */}
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/workshops"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Google Developers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Firebase
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  TensorFlow
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Flutter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Android Developers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>Augustana College</p>
              <p>639 38th Street</p>
              <p>Rock Island, IL 61201</p>
              <p className="pt-2">
                <a href="mailto:hieunguyen23@augustana.edu" className="hover:text-blue-600 dark:hover:text-blue-500">
                  hieunguyen23@augustana.edu
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Google Developer Group at Augustana College. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
