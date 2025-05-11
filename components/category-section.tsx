import { cn } from "@/lib/utils"
import Link from "next/link"

interface CategoryItemProps {
  icon: string
  label: string
  color?: string
  highlight?: boolean
  href?: string
}

interface CategorySectionProps {
  title: string
  items: CategoryItemProps[]
  columns?: number
  highlight?: boolean
}

export function CategorySection({ title, items, columns = 3, highlight = false }: CategorySectionProps) {
  return (
    <div className={cn("mb-6", highlight && "relative")}>
      {highlight && <div className="absolute -left-4 -right-4 -top-2 -bottom-2 bg-red-50 rounded-lg -z-10"></div>}
      <h2 className="text-sm font-medium mb-3">{title}</h2>
      <div className={cn("grid gap-4", `grid-cols-${columns}`)}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href || "#"}
            className="flex flex-col items-center justify-center p-2 rounded-lg active:bg-gray-100 transition-colors"
          >
            <div
              className={cn("w-10 h-10 flex items-center justify-center rounded-lg mb-1", item.color || "bg-gray-100")}
            >
              <span className="text-xl">{item.icon}</span>
            </div>
            <span className="text-xs text-center font-medium leading-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
