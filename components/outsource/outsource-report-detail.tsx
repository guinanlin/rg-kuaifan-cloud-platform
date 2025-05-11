"use client"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OutsourceReportDetailProps {
  reportId: string
  onBack: () => void
}

export function OutsourceReportDetail({ reportId, onBack }: OutsourceReportDetailProps) {
  // 模拟数据
  const reportData = {
    id: reportId,
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
    sizes: [
      { color: "蓝色", size: "30", processedCount: 90, inspectedCount: 50, status: "提报" },
      { color: "蓝色", size: "31", processedCount: 110, inspectedCount: 60, status: "提报" },
      { color: "蓝色", size: "33", processedCount: 110, inspectedCount: 55, status: "提报" },
      { color: "蓝色", size: "34", processedCount: 50, inspectedCount: 0, status: "提报" },
      { color: "蓝色", size: "35", processedCount: 60, inspectedCount: 0, status: "提报" },
      { color: "蓝色", size: "36", processedCount: 80, inspectedCount: 0, status: "提报" },
      { color: "蓝色", size: "38", processedCount: 60, inspectedCount: 0, status: "提报" },
    ],
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-12 px-4 border-b bg-blue-500 text-white sticky top-0 z-20">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-medium">进度数量上报 [报数]</h1>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
          提交
        </Button>
      </div>

      <div className="bg-white p-3 border-b">
        <div className="flex justify-between mb-1">
          <div className="text-sm">
            <span className="text-gray-500">外协: </span>
            <span>{reportData.id}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">订单: </span>
            <span>{reportData.orderNumber}</span>
          </div>
        </div>
        <div className="flex justify-between mb-1">
          <div className="text-sm">
            <span className="text-gray-500">数量: </span>
            <span>{reportData.quantity}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">交期: </span>
            <span>{reportData.dueDate}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mb-1">
          <div className="flex">
            <span className="text-red-600">加工数({reportData.processedCount})</span>
            <span className="ml-2 text-blue-600">裁剪({reportData.cutCount})</span>
          </div>
          <div className="flex">
            <span className="text-green-600">车缝上线({reportData.sewingCount})</span>
            <span className="ml-2 text-gray-600">烫整(0)</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex">
            <span className="text-gray-600">车缝下线(0)</span>
            <span className="ml-2 text-purple-600">后整({reportData.finishingCount})</span>
          </div>
          <div className="flex">
            <span className="text-gray-600">出货(0)</span>
            <span className="ml-2 text-gray-600">上架数(0)</span>
          </div>
        </div>
      </div>

      <div className="flex px-4 py-2 bg-white border-b">
        <div className="flex-1 text-center">
          <button className="text-sm font-medium text-blue-500 border-b-2 border-blue-500 pb-1 px-4">全部</button>
        </div>
        <div className="flex-1 text-center">
          <button className="text-sm text-gray-500 pb-1 px-4">蓝色</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="report" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-10 bg-white border-b">
            <TabsTrigger value="report" className="text-sm font-medium">
              上报数量
            </TabsTrigger>
            <TabsTrigger value="records" className="text-sm">
              上报记录
            </TabsTrigger>
          </TabsList>
          <TabsContent value="report" className="p-0 m-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 sticky top-0">
                  <tr className="text-xs text-gray-500">
                    <th className="py-2 px-3 text-left font-medium border-b sticky left-0 bg-gray-50">颜色/尺寸</th>
                    <th className="py-2 px-3 text-center font-medium border-b">加工/验收</th>
                    <th className="py-2 px-3 text-center font-medium border-b">本次上报</th>
                    <th className="py-2 px-3 text-center font-medium border-b">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.sizes.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-3 text-sm sticky left-0 bg-white">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.color}</span>
                          <span className="text-gray-500 text-xs">尺码: {item.size}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-sm">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500 text-xs">加工:</span>
                            <span className="font-medium">{item.processedCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500 text-xs">验收:</span>
                            <span className="font-medium">{item.inspectedCount}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-sm text-center">
                        <input
                          type="number"
                          defaultValue={0}
                          min={0}
                          step={1}
                          onKeyDown={(e) => {
                            // 阻止小数点输入
                            if (e.key === ".") {
                              e.preventDefault()
                            }
                          }}
                          className="w-20 h-10 text-center rounded border border-gray-300 bg-amber-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-base"
                        />
                      </td>
                      <td className="py-3 px-3 text-sm text-center">
                        <Button variant="outline" size="sm" className="text-xs h-7">
                          提报
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="records" className="p-0 m-0">
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <p>暂无上报记录</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="overflow-x-auto border-t bg-gray-50 py-2">
        <div className="flex min-w-[700px] px-3 text-xs text-gray-500">
          <div className="w-10 text-center">颜色</div>
          <div className="w-10 text-center ml-4">尺寸</div>
          <div className="w-10 text-center ml-4">加工数</div>
          <div className="w-10 text-center ml-4">车缝上线</div>
          <div className="w-10 text-center ml-4">车缝下线</div>
          <div className="w-10 text-center ml-4">后整</div>
          <div className="w-10 text-center ml-4">出货</div>
          <div className="w-10 text-center ml-4">收货数</div>
          <div className="w-10 text-center ml-4">上架数</div>
        </div>
      </div>
    </div>
  )
}
