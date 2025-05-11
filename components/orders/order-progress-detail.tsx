import { ChevronUp } from "lucide-react"

interface OrderStage {
  name: string
  status: string
  completedQuantity?: number
  completionRate?: number
  planDate?: string
  actualDate?: string
  responsible?: string
  remark?: string
  overdueDays?: number
}

interface OrderData {
  id: string
  styleNumber: string
  customer: string
  orderQuantity: number
  completedQuantity: number
  orderDate: string
  deliveryDate: string
  productionDays: number
  completionRate: number
  status: string
  image: string
  stages: OrderStage[]
}

interface OrderProgressDetailProps {
  order: OrderData
}

export function OrderProgressDetail({ order }: OrderProgressDetailProps) {
  return (
    <div className="flex-1 overflow-y-auto pb-16">
      <div className="p-3 border-b">
        <div className="flex">
          <div className="w-36 h-48 bg-gray-100 rounded overflow-hidden mr-3">
            <img
              src={order.image || "/placeholder.svg"}
              alt={order.styleNumber}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <div className="text-base font-medium">{order.id}</div>
              <div className="ml-2 text-blue-500 text-sm">返单-B</div>
            </div>
            <div className="text-sm mb-1">款号：{order.styleNumber}</div>
            <div className="text-sm mb-1">客户：XDS</div>
            <div className="text-sm mb-1">订单数：{order.orderQuantity}</div>
            <div className="text-sm mb-1">完成数：{order.completedQuantity}</div>
            <div className="text-sm mb-1">开单日期：{order.orderDate}</div>
            <div className="text-sm mb-1">交货日期：{order.deliveryDate}</div>
            <div className="text-sm text-red-500">制作天数：{order.productionDays}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center">
          <div className="w-20 text-center py-1 bg-blue-100 text-blue-600 rounded-l-full text-sm">{order.status}</div>
          <div className="flex-1 h-7 bg-gray-200 rounded-r-full">
            <div
              className="h-full bg-green-500 rounded-r-full flex items-center justify-end pr-2 text-white text-xs"
              style={{ width: `${order.completionRate}%` }}
            >
              完成率{order.completionRate}%
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* 时间线 */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {order.stages.map((stage, index) => (
          <div key={index} className="relative pl-12 pr-4 py-4 border-b">
            {/* 时间线节点 */}
            <div
              className={`absolute left-4 top-4 w-4 h-4 rounded-full ${
                stage.status === "已完成" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>

            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <span className={`font-medium ${stage.status === "已完成" ? "text-green-600" : "text-red-600"}`}>
                  【{stage.name}】
                </span>
                <span className="ml-2">{stage.status}</span>
                {stage.overdueDays && <span className="ml-2 text-red-500">{stage.overdueDays}天</span>}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              <div className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                完成数{stage.completedQuantity}
              </div>
              <div className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                完成率{stage.completionRate}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">计划：</span>
                <span>{stage.planDate}</span>
              </div>
              <div>
                <span className="text-gray-500">负责人：</span>
                <span>{stage.responsible}</span>
              </div>
              <div>
                <span className="text-gray-500">实际：</span>
                <span>{stage.actualDate}</span>
              </div>
              <div>
                <span className="text-gray-500">备注：</span>
                <span>{stage.remark}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center p-3">
          <ChevronUp className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
