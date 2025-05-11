"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { AppContainer } from "@/components/app-container"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

// 定义款式类型
interface StyleItem {
  id: string
  code: string
  name: string
  images: string[]
  category: string
  season: string
  description?: string
  materials?: string[]
}

export default function StyleDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [style, setStyle] = useState<StyleItem | null>(null)
  const [loading, setLoading] = useState(true)

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
      description: "优雅的女士连衣裙，适合春夏季节穿着。采用轻薄面料，舒适透气。",
      materials: ["棉", "聚酯纤维"],
    },
    {
      id: "2",
      code: "SD-002",
      name: "男士西装",
      images: [
        "/men-suit.png",
        "/placeholder.svg?key=4t28w",
        "/placeholder.svg?height=500&width=400&query=men suit side view",
      ],
      category: "男装",
      season: "四季",
      description: "经典男士西装，适合正式场合穿着。精选面料，剪裁合体。",
      materials: ["羊毛", "聚酯纤维"],
    },
    {
      id: "3",
      code: "SD-003",
      name: "女士衬衫",
      images: [
        "/placeholder.svg?height=500&width=400&query=women blouse",
        "/placeholder.svg?height=500&width=400&query=women blouse back view",
        "/placeholder.svg?height=500&width=400&query=women blouse details",
      ],
      category: "女装",
      season: "春秋",
      description: "简约女士衬衫，适合日常穿着。舒适面料，易于搭配。",
      materials: ["棉", "亚麻"],
    },
    {
      id: "4",
      code: "SD-004",
      name: "儿童T恤",
      images: [
        "/placeholder.svg?height=500&width=400&query=kids tshirt",
        "/placeholder.svg?height=500&width=400&query=kids tshirt back view",
        "/placeholder.svg?height=500&width=400&query=kids tshirt pattern",
      ],
      category: "童装",
      season: "夏季",
      description: "可爱儿童T恤，适合夏季穿着。柔软面料，舒适透气。",
      materials: ["棉"],
    },
    {
      id: "5",
      code: "SD-005",
      name: "女士牛仔裤",
      images: [
        "/placeholder.svg?height=500&width=400&query=women jeans",
        "/placeholder.svg?height=500&width=400&query=women jeans back view",
        "/placeholder.svg?height=500&width=400&query=women jeans side view",
        "/placeholder.svg?height=500&width=400&query=women jeans details",
      ],
      category: "女装",
      season: "四季",
      description: "经典女士牛仔裤，适合日常穿着。弹性面料，舒适合身。",
      materials: ["棉", "弹性纤维"],
    },
    {
      id: "6",
      code: "SD-006",
      name: "男士夹克",
      images: [
        "/placeholder.svg?height=500&width=400&query=men jacket",
        "/placeholder.svg?height=500&width=400&query=men jacket back view",
        "/placeholder.svg?height=500&width=400&query=men jacket side view",
      ],
      category: "男装",
      season: "秋冬",
      description: "时尚男士夹克，适合秋冬季节穿着。保暖面料，时尚设计。",
      materials: ["聚酯纤维", "棉"],
    },
    {
      id: "7",
      code: "SD-007",
      name: "女士短裙",
      images: [
        "/placeholder.svg?height=500&width=400&query=women skirt",
        "/placeholder.svg?height=500&width=400&query=women skirt back view",
        "/placeholder.svg?height=500&width=400&query=women skirt side view",
      ],
      category: "女装",
      season: "春夏",
      description: "时尚女士短裙，适合春夏季节穿着。轻薄面料，舒适透气。",
      materials: ["棉", "聚酯纤维"],
    },
    {
      id: "8",
      code: "SD-008",
      name: "男士休闲裤",
      images: [
        "/placeholder.svg?height=500&width=400&query=men casual pants",
        "/placeholder.svg?height=500&width=400&query=men casual pants back view",
        "/placeholder.svg?height=500&width=400&query=men casual pants details",
      ],
      category: "男装",
      season: "四季",
      description: "舒适男士休闲裤，适合日常穿着。柔软面料，舒适合身。",
      materials: ["棉", "弹性纤维"],
    },
    {
      id: "9",
      code: "SD-009",
      name: "儿童连衣裙",
      images: [
        "/placeholder.svg?height=500&width=400&query=kids dress",
        "/placeholder.svg?height=500&width=400&query=kids dress back view",
        "/placeholder.svg?height=500&width=400&query=kids dress pattern",
      ],
      category: "童装",
      season: "春夏",
      description: "可爱儿童连衣裙，适合春夏季节穿着。柔软面料，舒适透气。",
      materials: ["棉", "聚酯纤维"],
    },
  ]

  // 模拟获取款式数据
  useEffect(() => {
    const fetchStyle = async () => {
      // 模拟API请求延迟
      await new Promise((resolve) => setTimeout(resolve, 500))
      const foundStyle = styles.find((s) => s.id === id)
      setStyle(foundStyle || null)
      setLoading(false)
    }

    fetchStyle()
  }, [id])

  // 切换到下一张图片
  const nextImage = () => {
    if (!style) return
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % style.images.length)
  }

  // 切换到上一张图片
  const prevImage = () => {
    if (!style) return
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + style.images.length) % style.images.length)
  }

  if (loading) {
    return (
      <AppContainer>
        <div className="flex flex-col h-full">
          <PageHeader title="款式详情" backUrl="/material/styles" />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </AppContainer>
    )
  }

  if (!style) {
    return (
      <AppContainer>
        <div className="flex flex-col h-full">
          <PageHeader title="款式详情" backUrl="/material/styles" />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">未找到款式信息</p>
          </div>
        </div>
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      <div className="flex flex-col h-full">
        <PageHeader title={`款式详情 - ${style.code}`} backUrl="/material/styles" />

        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="relative">
              {/* 轮播图 */}
              <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={style.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${style.name} - 图片 ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* 左右切换按钮 */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full h-8 w-8"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full h-8 w-8"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* 图片指示器 */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {style.images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentImageIndex ? "w-4 bg-blue-500" : "w-1.5 bg-gray-300"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              {/* 缩略图预览 */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {style.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-blue-500" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`缩略图 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 款式信息 */}
            <div className="mt-4">
              <h2 className="text-xl font-medium">{style.name}</h2>
              <p className="text-gray-500 mt-1">款号: {style.code}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">类别:</span> {style.category}
                </div>
                <div>
                  <span className="text-gray-500">季节:</span> {style.season}
                </div>
                {style.materials && (
                  <div className="col-span-2">
                    <span className="text-gray-500">材质:</span> {style.materials.join(", ")}
                  </div>
                )}
              </div>

              {style.description && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">描述</h3>
                  <p className="mt-1 text-sm">{style.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  )
}
