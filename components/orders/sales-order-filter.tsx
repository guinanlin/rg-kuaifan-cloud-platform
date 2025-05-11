"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterParams {
  status?: string
  dateRange?: { start: string; end: string }
  department?: string
}

interface SalesOrderFilterProps {
  onFilter: (params: FilterParams) => void
}

export function SalesOrderFilter({ onFilter }: SalesOrderFilterProps) {
  const [status, setStatus] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [department, setDepartment] = useState("")

  const handleApplyFilter = () => {
    onFilter({
      status: status || undefined,
      dateRange: startDate || endDate ? { start: startDate, end: endDate } : undefined,
      department: department || undefined,
    })
  }

  const handleReset = () => {
    setStatus("")
    setStartDate("")
    setEndDate("")
    setDepartment("")
    onFilter({})
  }

  return (
    <div className="p-4 bg-gray-50 border-b space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="status" className="text-xs">
            订单状态
          </Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status" className="h-9">
              <SelectValue placeholder="选择状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="草稿">草稿</SelectItem>
              <SelectItem value="审批中">审批中</SelectItem>
              <SelectItem value="已确认">已确认</SelectItem>
              <SelectItem value="生产中">生产中</SelectItem>
              <SelectItem value="已完成">已完成</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="department" className="text-xs">
            业务部门
          </Label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger id="department" className="h-9">
              <SelectValue placeholder="选择部门" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="XS01-销售一部-D">XS01-销售一部-D</SelectItem>
              <SelectItem value="XS02-销售二部-A">XS02-销售二部-A</SelectItem>
              <SelectItem value="XS01-销售一部-C">XS01-销售一部-C</SelectItem>
              <SelectItem value="XS03-销售三部-B">XS03-销售三部-B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">创建日期范围</Label>
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
