"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { OrderType } from "@/types/order"

interface OrderListProps {
  orders: OrderType[]
}

export function OrderList({ orders }: OrderListProps) {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedOrder(expandedOrder === id ? null : id)
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-500">
        <p>暂无订单数据</p>
      </div>
    )
  }

  return (
    <div className="px-1 py-2 space-y-2">
      {/* 表头 */}
      <div className="grid grid-cols-12 text-xs font-medium text-gray-500 px-2">
        <div className="col-span-1">序号</div>
        <div className="col-span-3">颜色</div>
        <div className="col-span-2">款号</div>
        <div className="col-span-2">名称</div>
        <div className="col-span-2">数量</div>
        <div className="col-span-2">交货期</div>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* 订单基本信息行 - 始终显示 */}
          <div
            className="grid grid-cols-12 items-center py-3 px-2 cursor-pointer"
            onClick={() => toggleExpand(order.id)}
          >
            <div className="col-span-1 text-sm">{order.id}</div>
            <div className="col-span-3 text-sm truncate" title={order.color}>
              {order.color}
            </div>
            <div className="col-span-2 text-sm font-medium truncate" title={order.styleNumber}>
              {order.styleNumber}
            </div>
            <div className="col-span-2 text-sm truncate" title={order.name}>
              {order.name}
            </div>
            <div className="col-span-2 text-sm">{order.quantity}</div>
            <div className="col-span-2 text-sm">{order.dueDate}</div>
          </div>

          {/* 展开的详细信息 */}
          {expandedOrder === order.id && (
            <div className="px-3 py-2 bg-gray-50 border-t text-sm">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-gray-500">生产订单号</p>
                  <p className="font-medium">0508123456</p>
                </div>
                <div>
                  <p className="text-gray-500">外协订单号</p>
                  <p className="font-medium text-blue-600">WX0508003323</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-500">客户</p>
                  <p>{order.customer}</p>
                </div>
                <div>
                  <p className="text-gray-500">工厂</p>
                  <p className="text-green-700">南通大华</p>
                </div>
              </div>
            </div>
          )}

          {/* 展开/收起指示器 */}
          <div className="flex justify-center border-t py-1">
            {expandedOrder === order.id ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
