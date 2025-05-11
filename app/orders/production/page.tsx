"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown, ChevronUp, Barcode, ChevronLeft } from "lucide-react"
import { OrderList } from "@/components/orders/order-list"
import { OrderFilter } from "@/components/orders/order-filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useOrders } from "@/hooks/use-orders"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function ProductionOrderPage() {
  const [showFilter, setShowFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [factory, setFactory] = useState("南通大华")

  const { orders, isLoading, filterOrders } = useOrders("production")

  // 只在组件挂载时应用初始筛选
  useEffect(() => {
    // 使用setTimeout确保在初始渲染后应用筛选
    const timer = setTimeout(() => {
      if (factory) {
        filterOrders({ factory })
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [filterOrders]) // filterOrders是通过useCallback记忆的，不会导致无限循环

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    filterOrders({ search: value, factory: factory !== "all" ? factory : undefined })
  }

  const handleFactoryChange = (value: string) => {
    setFactory(value)
    filterOrders({
      search: searchQuery,
      factory: value !== "all" ? value : undefined,
    })
  }

  const handleScanBarcode = () => {
    // 这里可以添加扫描条形码的逻辑
    alert("启动条形码扫描")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-12 px-4 border-b bg-white sticky top-0 z-20">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-medium">生产订单</h1>
          <button
            className="ml-3 p-1.5 rounded-full bg-blue-50 hover:bg-blue-100 active:bg-blue-200 transition-colors"
            onClick={handleScanBarcode}
            aria-label="扫描条形码"
          >
            <Barcode className="h-6 w-6 text-blue-600" />
          </button>
        </div>
      </div>

      <div className="px-4 py-2 flex flex-col gap-2 bg-white sticky top-12 z-10 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索款号、名称或颜色..."
              className="pl-8 h-9 text-sm"
              value={searchQuery}
              onChange={handleSearch}
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

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 whitespace-nowrap">工厂:</label>
          <Select value={factory} onValueChange={handleFactoryChange}>
            <SelectTrigger className="h-9 flex-1 text-sm">
              <SelectValue placeholder="选择工厂" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="南通大华">南通大华</SelectItem>
              <SelectItem value="常熟服装厂">常熟服装厂</SelectItem>
              <SelectItem value="苏州制衣">苏州制衣</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showFilter && <OrderFilter onFilter={filterOrders} />}

      <div className="flex-1 overflow-auto pb-16">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <OrderList orders={orders} />
        )}
      </div>
    </div>
  )
}
