"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { OrderType } from "@/types/order"

// 模拟数据
const mockOrders: OrderType[] = [
  {
    id: 116,
    customer: "DBC",
    styleNumber: "21623",
    name: "夹克",
    color: "灰色格子布",
    quantity: 60,
    dueDate: "5/30",
    factory: "南通大华",
  },
  {
    id: 117,
    customer: "DBC",
    styleNumber: "21625",
    name: "长裤",
    color: "灰色格子布",
    quantity: 111,
    dueDate: "5/30",
    factory: "常熟服装厂",
  },
  {
    id: 118,
    customer: "DBC",
    styleNumber: "21628",
    name: "长裤",
    color: "灰色格子布",
    quantity: 21,
    dueDate: "5/30",
    factory: "南通大华",
  },
  {
    id: 119,
    customer: "DBC",
    styleNumber: "21622",
    name: "长袖衬衫",
    color: "白/红间色",
    quantity: 100,
    dueDate: "5/30",
    factory: "苏州制衣",
  },
  {
    id: 120,
    customer: "DBC",
    styleNumber: "21873",
    name: "长袖衬衫",
    color: "白/红间色",
    quantity: 80,
    dueDate: "5/30",
    factory: "南通大华",
  },
  {
    id: 121,
    customer: "DBC",
    styleNumber: "21762",
    name: "衬衫",
    color: "白/红间色",
    quantity: 150,
    dueDate: "5/30",
    factory: "常熟服装厂",
  },
]

interface FilterParams {
  search?: string
  customer?: string
  dateRange?: { start: string; end: string }
  factory?: string
}

export function useOrders(type: "production" | "sales") {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const originalOrdersRef = useRef<OrderType[]>([])

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
  }, [type])

  // 筛选函数
  const filterOrders = useCallback((params: FilterParams) => {
    const originalOrders = originalOrdersRef.current

    // 如果没有筛选条件，返回所有订单
    if (!params.search && !params.customer && !params.factory && !params.dateRange) {
      setOrders(originalOrders)
      return
    }

    let filtered = originalOrders

    // 应用搜索筛选
    if (params.search) {
      const searchLower = params.search.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.styleNumber.toLowerCase().includes(searchLower) ||
          order.name.toLowerCase().includes(searchLower) ||
          order.color.toLowerCase().includes(searchLower),
      )
    }

    // 应用客户筛选
    if (params.customer) {
      filtered = filtered.filter((order) => order.customer === params.customer)
    }

    // 应用工厂筛选
    if (params.factory && params.factory !== "all") {
      filtered = filtered.filter((order) => order.factory === params.factory)
    }

    // 应用日期范围筛选
    if (params.dateRange && (params.dateRange.start || params.dateRange.end)) {
      if (params.dateRange.start) {
        filtered = filtered.filter((order) => order.dueDate >= params.dateRange!.start)
      }
      if (params.dateRange.end) {
        filtered = filtered.filter((order) => order.dueDate <= params.dateRange!.end)
      }
    }

    setOrders(filtered)
  }, [])

  return { orders, isLoading, filterOrders }
}
