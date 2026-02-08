"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowMenu } from "./glow-menu"

const navItems = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/#about" },
	{ name: "Skills", href: "/#skills" },
	{ name: "Contact", href: "/#contact" },
]

const pageLinks = [
	{ name: "Graphic Design", href: "/graphic-design" }, 
	{ name: "Motion Graphics", href: "/motion-graphics" },
	{ name: "Web Development", href: "/web-development" }
]

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				scrolled 
					? "bg-transparent"
					: "bg-transparent"
			)}
		>
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-2">
						<Image src="/images/logo.svg" alt="OBK Logo" width={88} height={88} priority />
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6">
						<GlowMenu items={pageLinks} />
						
						<GlowMenu items={navItems.filter((i) => i.name !== "Contact")} />

						<Link
							href="/#contact"
							className="inline-flex items-center rounded-lg bg-brand text-white text-sm font-medium px-5 py-2.5 hover:opacity-90 transition-opacity"
						>
							Contact
						</Link>
					</div>

					{/* Mobile Navigation Toggle */}
					<div className="md:hidden">
						<button 
							onClick={() => setIsOpen(!isOpen)} 
							className="p-2.5 rounded-lg bg-[#1c1c1c] border border-[#2e2e2e] text-[#ecedee] hover:bg-[#232323] hover:border-[#343434] transition-colors"
						>
							{isOpen ? <X size={18} /> : <Menu size={18} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			{isOpen && (
				<div className="md:hidden bg-[#1a1d1e] border-b border-[#2b2f31]">
					<div className="container mx-auto px-4 py-4 space-y-1">
						{pageLinks.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="block py-3 px-4 rounded-lg text-[#9ba1a6] hover:text-[#ecedee] hover:bg-[#202425] transition-colors text-sm font-medium"
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</Link>
						))}
						{navItems.filter((i) => i.name !== "Contact").map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="block py-3 px-4 rounded-lg text-[#9ba1a6] hover:text-[#ecedee] hover:bg-[#202425] transition-colors text-sm"
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<div className="pt-3">
							<Link
								href="/#contact"
								className="block w-full text-center rounded-lg bg-brand text-white py-3 text-sm font-medium hover:opacity-90 transition-opacity"
								onClick={() => setIsOpen(false)}
							>
								Contact
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	)
}
