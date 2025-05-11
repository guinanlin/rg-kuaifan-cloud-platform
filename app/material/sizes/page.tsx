"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/ui/page-header"
import { AppContainer } from "@/components/app-container"

// 定义尺码类型
interface SizeType {
  id: string
  name: string
  value: string
}

// 定义尺码表类型
interface SizeChart {
  id: string
  name: string
  sizes: SizeType[]
}

export default function SizesPage() {
  // 模拟尺码表数据
  const [sizeCharts, setSizeCharts] = useState<SizeChart[]>([
    {
      id: "1",
      name: "成人服装尺码",
      sizes: [
        { id: "1-1", name: "00", value: "00" },
        { id: "1-2", name: "12", value: "12" },
        { id: "1-3", name: "14", value: "14" },
        { id: "1-4", name: "16", value: "16" },
        { id: "1-5", name: "18", value: "18" },
      ],
    },
    {
      id: "2",
      name: "儿童服装尺码",
      sizes: [
        { id: "2-1", name: "80", value: "80" },
        { id: "2-2", name: "90", value: "90" },
        { id: "2-3", name: "100", value: "100" },
        { id: "2-4", name: "110", value: "110" },
        { id: "2-5", name: "120", value: "120" },
      ],
    },
    {
      id: "3",
      name: "鞋码",
      sizes: [
        { id: "3-1", name: "35", value: "35" },
        { id: "3-2", name: "36", value: "36" },
        { id: "3-3", name: "37", value: "37" },
        { id: "3-4", name: "38", value: "38" },
        { id: "3-5", name: "39", value: "39" },
      ],
    },
  ])

  // 当前选中的尺码表
  const [selectedChartId, setSelectedChartId] = useState<string>(sizeCharts[0]?.id || "")

  // 获取当前选中的尺码表
  const selectedChart = sizeCharts.find((chart) => chart.id === selectedChartId) || sizeCharts[0]

  // 添加新尺码
  const addSize = () => {
    if (!selectedChart) return

    const newSizes = [...selectedChart.sizes]
    const newId = `${selectedChart.id}-${newSizes.length + 1}`
    newSizes.push({ id: newId, name: "", value: "" })

    const updatedCharts = sizeCharts.map((chart) =>
      chart.id === selectedChart.id ? { ...chart, sizes: newSizes } : chart,
    )

    setSizeCharts(updatedCharts)
  }

  // 更新尺码信息
  const updateSize = (sizeId: string, field: keyof SizeType, value: string) => {
    if (!selectedChart) return

    const updatedSizes = selectedChart.sizes.map((size) => (size.id === sizeId ? { ...size, [field]: value } : size))

    const updatedCharts = sizeCharts.map((chart) =>
      chart.id === selectedChart.id ? { ...chart, sizes: updatedSizes } : chart,
    )

    setSizeCharts(updatedCharts)
  }

  // 删除尺码
  const deleteSize = (sizeId: string) => {
    if (!selectedChart) return

    const updatedSizes = selectedChart.sizes.filter((size) => size.id !== sizeId)

    const updatedCharts = sizeCharts.map((chart) =>
      chart.id === selectedChart.id ? { ...chart, sizes: updatedSizes } : chart,
    )

    setSizeCharts(updatedCharts)
  }

  return (
    <AppContainer>
      <div className="flex flex-col h-full">
        <PageHeader title="尺码表" backUrl="/" />

        <div className="p-4 flex-1 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">尺码表</h2>
              <Select value={selectedChartId} onValueChange={setSelectedChartId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="下拉列表选择器" />
                </SelectTrigger>
                <SelectContent>
                  {sizeCharts.map((chart) => (
                    <SelectItem key={chart.id} value={chart.id}>
                      {chart.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedChart && (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">尺码</TableHead>
                      <TableHead className="w-1/2">值</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedChart.sizes.map((size) => (
                      <TableRow key={size.id}>
                        <TableCell>
                          <Input
                            value={size.name}
                            onChange={(e) => updateSize(size.id, "name", e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={size.value}
                            onChange={(e) => updateSize(size.id, "value", e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => deleteSize(size.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={addSize} className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    添加尺码
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
