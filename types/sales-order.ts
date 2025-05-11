export interface SalesOrderType {
  id: string
  orderNumber: string
  customerName: string
  contractNumber?: string
  amount: number
  currency: string
  paymentMethod?: string
  status: string
  department?: string
  salesperson: string
  createdDate: string
  deliveryDate: string
  // 可能的其他字段
  statusColor: string
}
