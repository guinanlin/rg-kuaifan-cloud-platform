"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { SalesOrderType } from "@/types/sales-order"

// 模拟数据
const mockOrders: SalesOrderType[] = [
  {
    id: "1",
    orderNumber: "SAL-ORD-2025-00037",
    customerName: "DEREK LAM 10 CROSBY",
    contractNumber: "",
    amount: 0.0,
    currency: "CNY",
    paymentMethod: "",
    status: "审批中",
    department: "",
    salesperson: "Administrator",
    createdDate: "2025-05-07",
    deliveryDate: "2025-05-23",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "2",
    orderNumber: "SAL-ORD-2025-00036",
    customerName: "DEREK LAM 10 CROSBY",
    contractNumber: "",
    amount: 500000.0,
    currency: "CNY",
    paymentMethod: "",
    status: "草稿",
    department: "XS01-销售一部-D",
    salesperson: "Administrator",
    createdDate: "2025-05-07",
    deliveryDate: "2025-05-07",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "3",
    orderNumber: "SAL-ORD-2025-00035",
    customerName: "ZARA",
    contractNumber: "CT-2025-0012",
    amount: 320000.0,
    currency: "CNY",
    paymentMethod: "电汇",
    status: "已确认",
    department: "XS02-销售二部-A",
    salesperson: "张三",
    createdDate: "2025-05-05",
    deliveryDate: "2025-06-15",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "4",
    orderNumber: "SAL-ORD-2025-00034",
    customerName: "H&M",
    contractNumber: "CT-2025-0011",
    amount: 450000.0,
    currency: "CNY",
    paymentMethod: "信用证",
    status: "生产中",
    department: "XS01-销售一部-C",
    salesperson: "李四",
    createdDate: "2025-05-03",
    deliveryDate: "2025-06-10",
    statusColor: "bg-purple-100 text-purple-800",
  },
  {
    id: "5",
    orderNumber: "SAL-ORD-2025-00033",
    customerName: "UNIQLO",
    contractNumber: "CT-2025-0010",
    amount: 280000.0,
    currency: "CNY",
    paymentMethod: "电汇",
    status: "已完成",
    department: "XS03-销售三部-B",
    salesperson: "王五",
    createdDate: "2025-05-01",
    deliveryDate: "2025-05-30",
    statusColor: "bg-gray-100 text-gray-800",
  },
]

interface FilterParams {
  search?: string
  status?: string
  dateRange?: { start: string; end: string }
  department?: string
}

export function useSalesOrders() {
  const [orders, setOrders] = useState<SalesOrderType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const originalOrdersRef = useRef<SalesOrderType[]>([])

  // 只在组件挂载时获取数据
  useEffect(() => {
    let isMounted = true
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        // 模拟API请求延迟
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (isMounted) {
          originalOrdersRef.current = mockOrders
          setOrders(mockOrders)
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchOrders()

    // 清理函数
    return () => {
      isMounted = false
    }
  }, [])

  // 筛选函数
  const filterOrders = useCallback((params: FilterParams) => {
    const originalOrders = originalOrdersRef.current

    // 如果没有筛选条件，返回所有订单
    if (!params.search && !params.status && !params.department && !params.dateRange) {
      setOrders(originalOrders)
      return
    }

    let filtered = originalOrders

    // 应用搜索筛选
    if (params.search) {
      const searchLower = params.search.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchLower) ||
          order.customerName.toLowerCase().includes(searchLower) ||
          (order.contractNumber && order.contractNumber.toLowerCase().includes(searchLower)),
      )
    }

    // 应用状态筛选
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((order) => order.status === params.status)
    }

    // 应用部门筛选
    if (params.department && params.department !== "all") {
      filtered = filtered.filter((order) => order.department === params.department)
    }

    // 应用日期范围筛选
    if (params.dateRange && (params.dateRange.start || params.dateRange.end)) {
      if (params.dateRange.start) {
        filtered = filtered.filter((order) => order.createdDate >= params.dateRange!.start)
      }
      if (params.dateRange.end) {
        filtered = filtered.filter((order) => order.createdDate <= params.dateRange!.end)
      }
    }

    setOrders(filtered)
  }, [])

  return { orders, isLoading, filterOrders }
}
