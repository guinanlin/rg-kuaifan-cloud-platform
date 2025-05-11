"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, ChevronDown, ChevronUp, Plus } from "lucide-react"
import { SalesOrderList } from "@/components/orders/sales-order-list"
import { SalesOrderFilter } from "@/components/orders/sales-order-filter"
import { SalesOrderDetail } from "@/components/orders/sales-order-detail"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSalesOrders } from "@/hooks/use-sales-orders"
import { PageHeader } from "@/components/ui/page-header"

export default function SalesOrderPage() {
  const [showFilter, setShowFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const { orders, isLoading, filterOrders } = useSalesOrders()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    filterOrders({ search: value })
  }

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(orderId)
  }

  const handleBackToList = () => {
    setSelectedOrderId(null)
  }

  // 如果选择了订单，显示订单详情
  if (selectedOrderId) {
    return <SalesOrderDetail orderId={selectedOrderId} onBack={handleBackToList} />
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="销售订单" backUrl="/" />

      <div className="px-4 py-2 flex flex-col gap-2 bg-white sticky top-12 z-10 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索订单号、客户名称..."
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
      </div>

      {showFilter && <SalesOrderFilter onFilter={filterOrders} />}

      <div className="flex-1 overflow-auto pb-16">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <SalesOrderList orders={orders} onSelectOrder={handleSelectOrder} />
        )}
      </div>

      {/* 悬浮添加按钮 */}
      <div className="fixed bottom-20 right-4">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
          onClick={() => alert("创建新订单")}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
