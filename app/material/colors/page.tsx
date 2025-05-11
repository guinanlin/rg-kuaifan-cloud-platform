"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/ui/page-header"
import { AppContainer } from "@/components/app-container"

// 定义颜色类型
interface ColorType {
  id: string
  name: string
  code: string
}

// 定义颜色分类类型
interface ColorCategory {
  id: string
  name: string
  colors: ColorType[]
}

export default function ColorsPage() {
  // 模拟颜色分类数据
  const [colorCategories, setColorCategories] = useState<ColorCategory[]>([
    {
      id: "1",
      name: "基础色系",
      colors: [
        { id: "1-1", name: "黑色", code: "#000000" },
        { id: "1-2", name: "白色", code: "#FFFFFF" },
        { id: "1-3", name: "灰色", code: "#808080" },
        { id: "1-4", name: "米色", code: "#F5F5DC" },
        { id: "1-5", name: "棕色", code: "#A52A2A" },
      ],
    },
    {
      id: "2",
      name: "蓝色系",
      colors: [
        { id: "2-1", name: "天蓝色", code: "#87CEEB" },
        { id: "2-2", name: "海军蓝", code: "#000080" },
        { id: "2-3", name: "宝蓝色", code: "#1E90FF" },
        { id: "2-4", name: "靛蓝色", code: "#4B0082" },
        { id: "2-5", name: "青色", code: "#00FFFF" },
      ],
    },
    {
      id: "3",
      name: "红色系",
      colors: [
        { id: "3-1", name: "大红色", code: "#FF0000" },
        { id: "3-2", name: "粉红色", code: "#FFC0CB" },
        { id: "3-3", name: "玫瑰红", code: "#FF007F" },
        { id: "3-4", name: "酒红色", code: "#8B0000" },
        { id: "3-5", name: "橙红色", code: "#FF4500" },
      ],
    },
  ])

  // 当前选中的颜色分类
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(colorCategories[0]?.id || "")

  // 获取当前选中的颜色分类
  const selectedCategory = colorCategories.find((category) => category.id === selectedCategoryId) || colorCategories[0]

  // 添加新颜色
  const addColor = () => {
    if (!selectedCategory) return

    const newColors = [...selectedCategory.colors]
    const newId = `${selectedCategory.id}-${newColors.length + 1}`
    newColors.push({ id: newId, name: "", code: "#CCCCCC" })

    const updatedCategories = colorCategories.map((category) =>
      category.id === selectedCategory.id ? { ...category, colors: newColors } : category,
    )

    setColorCategories(updatedCategories)
  }

  // 更新颜色信息
  const updateColor = (colorId: string, field: keyof ColorType, value: string) => {
    if (!selectedCategory) return

    const updatedColors = selectedCategory.colors.map((color) =>
      color.id === colorId ? { ...color, [field]: value } : color,
    )

    const updatedCategories = colorCategories.map((category) =>
      category.id === selectedCategory.id ? { ...category, colors: updatedColors } : category,
    )

    setColorCategories(updatedCategories)
  }

  // 删除颜色
  const deleteColor = (colorId: string) => {
    if (!selectedCategory) return

    const updatedColors = selectedCategory.colors.filter((color) => color.id !== colorId)

    const updatedCategories = colorCategories.map((category) =>
      category.id === selectedCategory.id ? { ...category, colors: updatedColors } : category,
    )

    setColorCategories(updatedCategories)
  }

  return (
    <AppContainer>
      <div className="flex flex-col h-full">
        <PageHeader title="颜色管理" backUrl="/" />

        <div className="p-4 flex-1 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">颜色表</h2>
              <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="下拉列表选择器" />
                </SelectTrigger>
                <SelectContent>
                  {colorCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory && (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">预览</TableHead>
                      <TableHead className="w-1/3">颜色名称</TableHead>
                      <TableHead className="w-1/3">颜色代码</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCategory.colors.map((color) => (
                      <TableRow key={color.id}>
                        <TableCell>
                          <div
                            className="w-8 h-8 rounded-full border border-gray-200"
                            style={{ backgroundColor: color.code }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={color.name}
                            onChange={(e) => updateColor(color.id, "name", e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              value={color.code}
                              onChange={(e) => updateColor(color.id, "code", e.target.value)}
                              className="h-8"
                            />
                            <Input
                              type="color"
                              value={color.code}
                              onChange={(e) => updateColor(color.id, "code", e.target.value)}
                              className="w-8 h-8 p-0 cursor-pointer"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => deleteColor(color.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={addColor} className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    添加颜色
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppContainer>
  )
}
