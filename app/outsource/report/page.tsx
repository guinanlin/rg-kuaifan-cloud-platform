"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { OutsourceReportList } from "@/components/outsource/outsource-report-list"
import { OutsourceReportDetail } from "@/components/outsource/outsource-report-detail"

export default function OutsourceReportPage() {
  const [showFilter, setShowFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  // 模拟数据
  const reports = [
    {
      id: "IO2410-0001",
      orderNumber: "PO2409-0013",
      quantity: 90309,
      dueDate: "2024-10-15",
      processedCount: 560,
      cutCount: 165,
      sewingCount: 70,
      ironingCount: 0,
      packagingCount: 0,
      finishingCount: 38,
      outCount: 0,
      upperCount: 0,
      color: "蓝色",
    },
    {
      id: "IO2410-0002",
      orderNumber: "PO2409-0014",
      quantity: 85000,
      dueDate: "2024-10-20",
      processedCount: 480,
      cutCount: 150,
      sewingCount: 65,
      ironingCount: 0,
      packagingCount: 0,
      finishingCount: 30,
      outCount: 0,
      upperCount: 0,
      color: "红色",
    },
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  if (selectedReport) {
    return <OutsourceReportDetail reportId={selectedReport} onBack={() => setSelectedReport(null)} />
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-12 px-4 border-b bg-blue-500 text-white sticky top-0 z-20">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-medium">外协上报</h1>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
          提交
        </Button>
      </div>

      <div className="px-4 py-2 flex flex-col gap-2 bg-white sticky top-12 z-10 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索外协号、订单号..."
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

      <div className="flex-1 overflow-auto pb-16">
        <OutsourceReportList reports={reports} onSelectReport={(id) => setSelectedReport(id)} />
      </div>
    </div>
  )
}
