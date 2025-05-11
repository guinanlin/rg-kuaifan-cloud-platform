import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  backUrl: string
}

export function PageHeader({ title, backUrl }: PageHeaderProps) {
  return (
    <div className="flex items-center h-12 px-4 border-b bg-white sticky top-0 z-20">
      <Link href={backUrl} className="mr-2">
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <h1 className="text-lg font-medium">{title}</h1>
    </div>
  )
}
