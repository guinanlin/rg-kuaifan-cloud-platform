"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterParams {
  customer?: string
  dateRange?: { start: string; end: string }
  factory?: string
}

interface OrderFilterProps {
  onFilter: (params: FilterParams) => void
}

export function OrderFilter({ onFilter }: OrderFilterProps) {
  const [customer, setCustomer] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [factory, setFactory] = useState("")

  const handleApplyFilter = () => {
    onFilter({
      customer: customer || undefined,
      dateRange: startDate || endDate ? { start: startDate, end: endDate } : undefined,
      factory: factory || undefined,
    })
  }

  const handleReset = () => {
    setCustomer("")
    setStartDate("")
    setEndDate("")
    setFactory("")
    onFilter({})
  }

  return (
    <div className="p-4 bg-gray-50 border-b space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="customer" className="text-xs">
            客户
          </Label>
          <Select value={customer} onValueChange={setCustomer}>
            <SelectTrigger id="customer" className="h-9">
              <SelectValue placeholder="选择客户" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DBC">DBC</SelectItem>
              <SelectItem value="ABC">ABC</SelectItem>
              <SelectItem value="XYZ">XYZ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="factory" className="text-xs">
            工厂状态
          </Label>
          <Select value={factory} onValueChange={setFactory}>
            <SelectTrigger id="factory" className="h-9">
              <SelectValue placeholder="选择状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="待定">待定</SelectItem>
              <SelectItem value="已确认">已确认</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">货期范围</Label>
        <div className="flex items-center gap-2">
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-9" />
          <span className="text-gray-500">至</span>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-9" />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={handleReset}>
          重置
        </Button>
        <Button size="sm" onClick={handleApplyFilter}>
          应用筛选
        </Button>
      </div>
    </div>
  )
}
