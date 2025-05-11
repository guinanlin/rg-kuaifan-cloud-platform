"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Search, ScanLine, ChevronDown, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrderProgressDetail } from "@/components/orders/order-progress-detail"
import { OrderProgressSidebar } from "@/components/orders/order-progress-sidebar"

export default function OrderProgressPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [dateRange, setDateRange] = useState("2023/09/18-2023/09/22")

  // 模拟订单数据
  const orderData = {
    id: "PO2203-0012",
    styleNumber: "Test-0428",
    customer: "衣智互联",
    orderQuantity: 1230,
    completedQuantity: 1000,
    orderDate: "2023/04/08",
    deliveryDate: "2023/09/10",
    productionDays: 126,
    completionRate: 94,
    status: "未完成",
    image: "/elegant-black-dress.png",
    stages: [
      {
        name: "主料",
        status: "已完成",
        completedQuantity: 1000,
        completionRate: 90,
        planDate: "2022/05/15",
        actualDate: "2022/02/03",
        responsible: "欧阳娜娜",
        remark: "暂无",
      },
      {
        name: "主料齐料",
        status: "超期",
        overdueDays: 33,
        completedQuantity: 1000,
        completionRate: 90,
        planDate: "2022/02/28",
        actualDate: "2022/02/03",
        responsible: "郭襄",
        remark: "缺面料",
      },
    ],
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleScan = () => {
    alert("启动扫码")
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-12 px-4 border-b bg-white sticky top-0 z-20">
        <Link href="/" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">订单进度图</h1>
      </div>

      <div className="px-4 py-2 bg-gray-50 border-b">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="请输入订单号、款号、款名等"
              className="pl-8 h-9 text-sm bg-white"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 bg-white" onClick={handleScan}>
            <ScanLine className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div
            className="flex items-center text-sm text-gray-600 cursor-pointer"
            onClick={() => setShowDateFilter(!showDateFilter)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            <span>开单日期</span>
            <ChevronDown className="h-3 w-3 ml-1" />
            <span className="ml-2 text-gray-500">{dateRange}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-1" />
            <span>更多筛选</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </div>
        </div>

        {showDateFilter && (
          <div className="mt-2 p-2 bg-white rounded border">
            <div className="flex justify-between mb-2">
              <Button variant="outline" size="sm" className="text-xs">
                今天
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                昨天
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                本周
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                上周
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Input type="date" className="h-8 text-xs" />
              <span className="text-gray-500">至</span>
              <Input type="date" className="h-8 text-xs" />
              <Button size="sm" className="text-xs">
                确定
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2 p-2 bg-white border-b overflow-x-auto">
        <Button
          variant={selectedStatus === "all" ? "default" : "ghost"}
          size="sm"
          className="rounded-full text-xs"
          onClick={() => handleStatusChange("all")}
        >
          全部
        </Button>
        <Button
          variant={selectedStatus === "reviewed" ? "default" : "ghost"}
          size="sm"
          className="rounded-full text-xs"
          onClick={() => handleStatusChange("reviewed")}
        >
          已审核
        </Button>
        <Button
          variant={selectedStatus === "closed" ? "default" : "ghost"}
          size="sm"
          className="rounded-full text-xs"
          onClick={() => handleStatusChange("closed")}
        >
          已结案
        </Button>
        <Button
          variant={selectedStatus === "cancelled" ? "default" : "ghost"}
          size="sm"
          className="rounded-full text-xs"
          onClick={() => handleStatusChange("cancelled")}
        >
          已作废
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <OrderProgressSidebar selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <OrderProgressDetail order={orderData} />
      </div>
    </div>
  )
}
