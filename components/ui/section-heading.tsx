interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-2 text-foreground">
        {title}
      </h2>
      {subtitle && <p className="text-[#687076] dark:text-[#9ba1a6] text-sm max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-12 h-0.5 bg-gradient-to-r from-brand-accent to-brand mx-auto mt-4 rounded-full" />
    </div>
  )
}
