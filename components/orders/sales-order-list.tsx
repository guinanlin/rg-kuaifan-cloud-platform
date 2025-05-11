"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react"
import type { SalesOrderType } from "@/types/sales-order"
import { formatCurrency } from "@/lib/utils"

interface SalesOrderListProps {
  orders: SalesOrderType[]
  onSelectOrder: (orderId: string) => void
}

export function SalesOrderList({ orders, onSelectOrder }: SalesOrderListProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
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
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* 订单基本信息行 - 始终显示 */}
          <div className="p-3 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">{order.orderNumber}</div>
              <div className={`text-xs px-2 py-0.5 rounded-full ${order.statusColor}`}>{order.status}</div>
            </div>
            <div className="text-sm mb-1 truncate">{order.customerName}</div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">{formatCurrency(order.amount, order.currency)}</div>
              <div className="text-xs text-gray-500">创建: {order.createdDate}</div>
            </div>
          </div>

          {/* 展开的详细信息 */}
          {expandedOrder === order.id && (
            <div className="px-3 py-2 bg-gray-50 border-t text-sm">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-gray-500 text-xs">合同编号</p>
                  <p className="font-medium">{order.contractNumber || "无"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">付款方式</p>
                  <p className="font-medium">{order.paymentMethod || "未设置"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-gray-500 text-xs">业务部门</p>
                  <p className="font-medium">{order.department || "未分配"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">销售员</p>
                  <p className="font-medium">{order.salesperson}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-500 text-xs">创建日期</p>
                  <p className="font-medium">{order.createdDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">交付日期</p>
                  <p className="font-medium">{order.deliveryDate}</p>
                </div>
              </div>
            </div>
          )}

          {/* 底部操作区 */}
          <div className="flex justify-between items-center px-3 py-2 border-t">
            <button className="flex items-center text-xs text-gray-500" onClick={() => toggleExpand(order.id)}>
              {expandedOrder === order.id ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  收起详情
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  查看详情
                </>
              )}
            </button>
            <button className="flex items-center text-xs text-blue-600" onClick={() => onSelectOrder(order.id)}>
              查看明细
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
