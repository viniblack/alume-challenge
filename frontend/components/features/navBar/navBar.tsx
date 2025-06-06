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

export function NavBar() {
  const router = useRouter()

  const handleSignOut = () => {
    authLogout()
    router.push('/')
  }
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="flex w-[100vw] justify-between mt-3 px-10">
        {/* Logo */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <Image
                aria-hidden
                src="/alume.svg"
                alt="Alume logo"
                width={100}
                height={38}
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-md">Minha área</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[120px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/simulation">Simulações</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/profile">Meus dados</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="justify-start w-full"
                  >
                    Sair
                  </Button>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}