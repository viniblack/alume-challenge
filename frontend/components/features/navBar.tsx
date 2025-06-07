"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { authLogout } from "@/services/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function NavBar() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    authLogout()
    router.push("/")
  }

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            aria-hidden
            src="/alume.svg"
            alt="Alume logo"
            width={100}
            height={38}
          />
        </Link>

        {/* Botão Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu Desktop */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-md">
                Minha área
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[150px] gap-2 p-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/simulation">Simulações</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/profile">Meus dados</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <span
                        onClick={handleSignOut}
                        className="justify-start w-full"
                      >
                        Sair
                      </span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-2 px-4">
          <Link href="/dashboard" className="block text-gray-800 hover:underline">
            Dashboard
          </Link>
          <Link href="/simulation" className="block text-gray-800 hover:underline">
            Simulações
          </Link>
          <Link href="/profile" className="block text-gray-800 hover:underline">
            Meus dados
          </Link>
          <span
            onClick={handleSignOut}
            className="w-full text-left"
          >
            Sair
          </span>
        </div>
      )}
    </nav>
  )
}
