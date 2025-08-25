"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/#about" },
	{ name: "Skills", href: "/#skills" },
	{ name: "Other Skills", href: "/#other-skills" },
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

	const isActive = (href: string) => pathname === href || pathname.startsWith(href)
	const baseLink =
		"relative text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-teal-400 after:w-0 hover:after:w-full after:transition-all"

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
					<Link
						href="/"
						className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200 hover:opacity-80 transition-opacity"
					>
						OBK
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-3">
						<div className={cn(
							"hidden md:flex items-center gap-6 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md",
							"border-gray-800/60 bg-gray-950/60"
						)}>
							{pageLinks.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(baseLink, isActive(item.href) && "text-teal-400 after:w-full")}
								>
									{item.name}
								</Link>
							))}
							{navItems
								.filter((i) => i.name !== "Contact")
								.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={baseLink}
									>
										{item.name}
									</Link>
								))}
						</div>

						<Link
							href="/#contact"
							className="ml-3 inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 px-4 py-2 font-semibold shadow-[0_0_12px_rgba(45,212,191,0.4)] hover:shadow-[0_0_18px_rgba(45,212,191,0.6)] transition-all"
						>
							Contact
						</Link>
					</div>

					{/* Mobile Navigation Toggle */}
					<div className="md:hidden">
						<button 
							onClick={() => setIsOpen(!isOpen)} 
							className="p-2 rounded-xl bg-gray-900/80 border border-gray-800 text-gray-300 hover:bg-gray-800 transition-colors shadow"
						>
							{isOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			{isOpen && (
				<div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 shadow-lg">
					<div className="container mx-auto px-4 py-4 space-y-2">
						{pageLinks.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="block py-3 px-4 rounded-lg text-gray-300 hover:text-teal-400 hover:bg-gray-800 transition-all font-medium"
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</Link>
						))}
						{navItems.filter((i) => i.name !== "Contact").map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="block py-3 px-4 rounded-lg text-gray-300 hover:text-teal-400 hover:bg-gray-800 transition-all"
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</Link>
						))}

						<div className="pt-2">
							<Link
								href="/#contact"
								className="block w-full text-center rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 py-3 font-semibold shadow hover:opacity-95"
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
