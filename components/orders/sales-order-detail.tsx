"use client"

import { useState } from "react"
import { ChevronLeft, FileText, Package, Truck, DollarSign, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"

interface OrderItem {
  id: string
  productName: string
  styleNumber: string
  color: string
  size: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface SalesOrderDetailProps {
  orderId: string
  onBack: () => void
}

export function SalesOrderDetail({ orderId, onBack }: SalesOrderDetailProps) {
  const [activeTab, setActiveTab] = useState("items")

  // 模拟订单数据
  const orderData = {
    id: orderId,
    orderNumber: "SAL-ORD-2025-00037",
    customerName: "DEREK LAM 10 CROSBY",
    contractNumber: "",
    amount: 500000.0,
    currency: "CNY",
    paymentMethod: "电汇",
    status: "审批中",
    department: "XS01-销售一部-D",
    salesperson: "Administrator",
    createdDate: "2025-05-07",
    deliveryDate: "2025-05-23",
    contactPerson: "John Smith",
    contactPhone: "+1 123-456-7890",
    contactEmail: "john.smith@dereklam.com",
    shippingAddress: "123 Fashion Ave, New York, NY 10001, USA",
    billingAddress: "456 Corporate Blvd, New York, NY 10001, USA",
    paymentTerms: "30% 订金, 70% 发货前",
    remarks: "客户要求所有产品使用环保包装，并附带详细的产品说明书。",
    items: [
      {
        id: "1",
        productName: "女士连衣裙",
        styleNumber: "DL-2025-001",
        color: "黑色",
        size: "S",
        quantity: 100,
        unitPrice: 1500.0,
        totalPrice: 150000.0,
      },
      {
        id: "2",
        productName: "女士连衣裙",
        styleNumber: "DL-2025-001",
        color: "黑色",
        size: "M",
        quantity: 150,
        unitPrice: 1500.0,
        totalPrice: 225000.0,
      },
      {
        id: "3",
        productName: "女士连衣裙",
        styleNumber: "DL-2025-001",
        color: "黑色",
        size: "L",
        quantity: 50,
        unitPrice: 1500.0,
        totalPrice: 75000.0,
      },
      {
        id: "4",
        productName: "女士衬衫",
        styleNumber: "DL-2025-002",
        color: "白色",
        size: "S",
        quantity: 50,
        unitPrice: 1000.0,
        totalPrice: 50000.0,
      },
    ],
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center h-12 px-4 border-b bg-white sticky top-0 z-20">
        <button onClick={onBack} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-medium">销售订单详情</h1>
      </div>

      {/* 订单基本信息卡片 */}
      <div className="p-3 bg-white border-b">
        <div className="flex justify-between items-center mb-2">
          <div className="text-base font-medium">{orderData.orderNumber}</div>
          <div className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">{orderData.status}</div>
        </div>
        <div className="text-sm mb-1">{orderData.customerName}</div>
        <div className="text-lg font-semibold text-blue-600 mb-2">
          {formatCurrency(orderData.amount, orderData.currency)}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            创建: {orderData.createdDate}
          </div>
          <div className="flex items-center text-gray-600">
            <Truck className="h-3.5 w-3.5 mr-1" />
            交付: {orderData.deliveryDate}
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 h-10 bg-white border-b">
          <TabsTrigger value="items" className="text-xs">
            订单明细
          </TabsTrigger>
          <TabsTrigger value="customer" className="text-xs">
            客户信息
          </TabsTrigger>
          <TabsTrigger value="payment" className="text-xs">
            付款信息
          </TabsTrigger>
        </TabsList>

        {/* 订单明细标签内容 */}
        <TabsContent value="items" className="flex-1 overflow-auto p-0 m-0">
          <div className="p-3 bg-white border-b flex items-center justify-between">
            <div className="text-sm font-medium">订单明细 ({orderData.items.length})</div>
            <div className="text-xs text-gray-500">总金额: {formatCurrency(orderData.amount, orderData.currency)}</div>
          </div>

          <div className="divide-y">
            {orderData.items.map((item) => (
              <div key={item.id} className="p-3 bg-white">
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium">{item.productName}</div>
                  <div className="text-sm font-medium">{formatCurrency(item.totalPrice, orderData.currency)}</div>
                </div>
                <div className="flex justify-between mb-1">
                  <div className="text-xs text-gray-500">款号: {item.styleNumber}</div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(item.unitPrice, orderData.currency)} × {item.quantity}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs">
                    <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded mr-1">{item.color}</span>
                    <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded">{item.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* 客户信息标签内容 */}
        <TabsContent value="customer" className="flex-1 overflow-auto p-0 m-0">
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium">基本信息</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">客户名称</div>
                  <div className="text-sm">{orderData.customerName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">联系人</div>
                  <div className="text-sm">{orderData.contactPerson}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">联系电话</div>
                  <div className="text-sm">{orderData.contactPhone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">联系邮箱</div>
                  <div className="text-sm">{orderData.contactEmail}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <Truck className="h-4 w-4 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium">地址信息</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">送货地址</div>
                  <div className="text-sm">{orderData.shippingAddress}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">账单地址</div>
                  <div className="text-sm">{orderData.billingAddress}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <Package className="h-4 w-4 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium">订单信息</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">合同编号</div>
                  <div className="text-sm">{orderData.contractNumber || "无"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">业务部门</div>
                  <div className="text-sm">{orderData.department}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">销售员</div>
                  <div className="text-sm">{orderData.salesperson}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">备注</div>
                  <div className="text-sm">{orderData.remarks}</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 付款信息标签内容 */}
        <TabsContent value="payment" className="flex-1 overflow-auto p-0 m-0">
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium">付款信息</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">订单金额</div>
                  <div className="text-sm font-medium">{formatCurrency(orderData.amount, orderData.currency)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">付款方式</div>
                  <div className="text-sm">{orderData.paymentMethod}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">付款条件</div>
                  <div className="text-sm">{orderData.paymentTerms}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium">日期信息</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">创建日期</div>
                  <div className="text-sm">{orderData.createdDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">交付日期</div>
                  <div className="text-sm">{orderData.deliveryDate}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-medium mb-2">付款记录</h3>
              <div className="text-center py-4 text-gray-500 text-sm">暂无付款记录</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
