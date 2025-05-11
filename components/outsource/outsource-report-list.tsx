"use client"

import { ChevronRight } from "lucide-react"

interface OutsourceReport {
  id: string
  orderNumber: string
  quantity: number
  dueDate: string
  processedCount: number
  cutCount: number
  sewingCount: number
  ironingCount: number
  packagingCount: number
  finishingCount: number
  outCount: number
  upperCount: number
  color: string
}

interface OutsourceReportListProps {
  reports: OutsourceReport[]
  onSelectReport: (id: string) => void
}

export function OutsourceReportList({ reports, onSelectReport }: OutsourceReportListProps) {
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-500">
        <p>暂无外协上报数据</p>
      </div>
    )
  }

  return (
    <div className="px-1 py-2 space-y-2">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          onClick={() => onSelectReport(report.id)}
        >
          <div className="p-3 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">外协号: </span>
                <span className="text-sm font-medium ml-1">{report.id}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">订单号: </span>
                <span className="text-sm font-medium ml-1">{report.orderNumber}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">数量: </span>
                <span className="text-sm font-medium ml-1">{report.quantity}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">交期: </span>
                <span className="text-sm font-medium ml-1">{report.dueDate}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1 text-xs">
              <div className="bg-red-50 p-1 rounded">
                <div className="text-center text-red-600">加工数</div>
                <div className="text-center font-medium">{report.processedCount}</div>
              </div>
              <div className="bg-blue-50 p-1 rounded">
                <div className="text-center text-blue-600">裁剪</div>
                <div className="text-center font-medium">{report.cutCount}</div>
              </div>
              <div className="bg-green-50 p-1 rounded">
                <div className="text-center text-green-600">车缝上线</div>
                <div className="text-center font-medium">{report.sewingCount}</div>
              </div>
              <div className="bg-purple-50 p-1 rounded">
                <div className="text-center text-purple-600">后道</div>
                <div className="text-center font-medium">{report.finishingCount}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-3 py-2">
            <div className="flex items-center">
              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">{report.color}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  )
}
