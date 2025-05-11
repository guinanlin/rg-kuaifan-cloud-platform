"use client"

interface CategoryItem {
  id: string
  name: string
  count: number
}

interface OrderProgressSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function OrderProgressSidebar({ selectedCategory, onCategoryChange }: OrderProgressSidebarProps) {
  // 模拟分类数据
  const categories: CategoryItem[] = [
    { id: "all", name: "全部", count: 260 },
    { id: "task_received", name: "任务接收", count: 13 },
    { id: "main_material", name: "主料", count: 21 },
    { id: "paper_pattern", name: "纸样", count: 2 },
    { id: "main_material_ready", name: "主料齐料", count: 22 },
    { id: "accessory_ready", name: "辅料齐料", count: 12 },
    { id: "fabric_process", name: "面料工艺", count: 3 },
    { id: "fabric_bonding", name: "面料贴合", count: 4 },
  ]

  return (
    <div className="w-28 border-r overflow-y-auto bg-gray-50">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`p-3 border-b cursor-pointer ${
            selectedCategory === category.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          <div className="text-sm font-medium">{category.name}</div>
          <div className="text-xs text-gray-500">({category.count})</div>
        </div>
      ))}
    </div>
  )
}
