"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Linkedin, Github, Send } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send form data to our API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Success - reset form and show success message
        setFormData({ name: "", email: "", message: "" })
        alert(result.message)
      } else {
        // API error
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error("Error sending message:", error)
      
      // Fallback to mailto: if API fails
      const mailtoLink = `mailto:obokeng.mark@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
      
      if (confirm("There was an error with the form. Would you like to open your email client instead?")) {
        window.location.href = mailtoLink
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-teal-400" />,
      label: "Location",
      value: "Botswana",
    },
    {
      icon: <Phone className="h-5 w-5 text-teal-400" />,
      label: "Phone",
      value: "+267 XXX XXX XXX",
    },
    {
      icon: <Mail className="h-5 w-5 text-teal-400" />,
      label: "Email",
      value: "obokeng.mark@gmail.com",
      link: "mailto:obokeng.mark@gmail.com",
    },
    {
      icon: <Linkedin className="h-5 w-5 text-teal-400" />,
      label: "LinkedIn",
      value: "linkedin.com/in/obokeng-makwati-963304151",
      link: "https://www.linkedin.com/in/obokeng-makwati-963304151/",
    },
    {
      icon: <Github className="h-5 w-5 text-teal-400" />,
      label: "GitHub",
      value: "github.com/obokengmakwati",
      link: "https://github.com/obokengmakwati",
    },
  ]

  return (
    <section id="contact" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Contact Me" subtitle="Let's get in touch" />

      <div className="grid md:grid-cols-2 gap-10">
        <div
          className={cn(
            "space-y-6 opacity-0 transform -translate-x-8 transition-all duration-1000",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">{info.icon}</div>
                  <div>
                    <h4 className="text-sm text-gray-400">{info.label}</h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        target={info.label === "Email" ? "_self" : "_blank"}
                        rel={info.label === "Email" ? "" : "noopener noreferrer"}
                        className="text-gray-300 hover:text-teal-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-300">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "opacity-0 transform translate-x-8 transition-all duration-1000 delay-300",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50"
          >
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Send Me a Message</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm text-gray-400 mb-1 block">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-gray-800/50 border-gray-700 focus:border-teal-500 focus:ring-teal-500/20"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-gray-400 mb-1 block">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="bg-gray-800/50 border-gray-700 focus:border-teal-500 focus:ring-teal-500/20"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-gray-400 mb-1 block">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  className="bg-gray-800/50 border-gray-700 focus:border-teal-500 focus:ring-teal-500/20 min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all duration-300 disabled:opacity-50"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Opening Email..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Obokeng Makwati. All rights reserved.</p>
      </div>
    </section>
  )
}
