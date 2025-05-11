"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { AppContainer } from "@/components/app-container"
import Link from "next/link"

// 定义款式类型
interface StyleItem {
  id: string
  code: string
  name: string
  images: string[]
  category: string
  season: string
}

export default function StylesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilter, setShowFilter] = useState(false)

  // 模拟款式数据
  const styles: StyleItem[] = [
    {
      id: "1",
      code: "SD-001",
      name: "女士连衣裙",
      images: [
        "/elegant-dress.png",
        "/elegant-dress-back-view.png",
        "/elegant-dress-side.png",
        "/elegant-dress-details.png",
      ],
      category: "女装",
      season: "春夏",
    },
    {
      id: "2",
      code: "SD-002",
      name: "男士西装",
      images: [
        "/men-suit.png",
        "/placeholder.svg?key=zfe6c",
        "/placeholder.svg?height=300&width=220&query=men suit side view",
      ],
      category: "男装",
      season: "四季",
    },
    {
      id: "3",
      code: "SD-003",
      name: "女士衬衫",
      images: [
        "/placeholder.svg?height=300&width=220&query=women blouse",
        "/placeholder.svg?height=300&width=220&query=women blouse back view",
        "/placeholder.svg?height=300&width=220&query=women blouse details",
      ],
      category: "女装",
      season: "春秋",
    },
    {
      id: "4",
      code: "SD-004",
      name: "儿童T恤",
      images: [
        "/placeholder.svg?height=300&width=220&query=kids tshirt",
        "/placeholder.svg?height=300&width=220&query=kids tshirt back view",
        "/placeholder.svg?height=300&width=220&query=kids tshirt pattern",
      ],
      category: "童装",
      season: "夏季",
    },
    {
      id: "5",
      code: "SD-005",
      name: "女士牛仔裤",
      images: [
        "/placeholder.svg?height=300&width=220&query=women jeans",
        "/placeholder.svg?height=300&width=220&query=women jeans back view",
        "/placeholder.svg?height=300&width=220&query=women jeans side view",
        "/placeholder.svg?height=300&width=220&query=women jeans details",
      ],
      category: "女装",
      season: "四季",
    },
    {
      id: "6",
      code: "SD-006",
      name: "男士夹克",
      images: [
        "/placeholder.svg?height=300&width=220&query=men jacket",
        "/placeholder.svg?height=300&width=220&query=men jacket back view",
        "/placeholder.svg?height=300&width=220&query=men jacket side view",
      ],
      category: "男装",
      season: "秋冬",
    },
    {
      id: "7",
      code: "SD-007",
      name: "女士短裙",
      images: [
        "/placeholder.svg?height=300&width=220&query=women skirt",
        "/placeholder.svg?height=300&width=220&query=women skirt back view",
        "/placeholder.svg?height=300&width=220&query=women skirt side view",
      ],
      category: "女装",
      season: "春夏",
    },
    {
      id: "8",
      code: "SD-008",
      name: "男士休闲裤",
      images: [
        "/placeholder.svg?height=300&width=220&query=men casual pants",
        "/placeholder.svg?height=300&width=220&query=men casual pants back view",
        "/placeholder.svg?height=300&width=220&query=men casual pants details",
      ],
      category: "男装",
      season: "四季",
    },
    {
      id: "9",
      code: "SD-009",
      name: "儿童连衣裙",
      images: [
        "/placeholder.svg?height=300&width=220&query=kids dress",
        "/placeholder.svg?height=300&width=220&query=kids dress back view",
        "/placeholder.svg?height=300&width=220&query=kids dress pattern",
      ],
      category: "童装",
      season: "春夏",
    },
  ]

  // 根据搜索条件过滤款式
  const filteredStyles = styles.filter((style) => {
    if (!searchQuery) return true
    return (
      style.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <AppContainer>
      <div className="flex flex-col h-full">
        <PageHeader title="款式库" backUrl="/" />

        <div className="px-4 py-2 flex flex-col gap-2 bg-white sticky top-12 z-10 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索款号、名称..."
                className="pl-8 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 whitespace-nowrap"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="h-4 w-4" />
              筛选
              {showFilter ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {filteredStyles.map((style) => (
              <Link href={`/material/styles/${style.id}`} key={style.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={style.images[0] || "/placeholder.svg"}
                      alt={style.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-sm font-medium truncate">{style.code}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppContainer>
  )
}
