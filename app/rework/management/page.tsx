"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Plus, Trash2, Camera, Calendar, Search, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// 定义返工项目类型
interface ReworkItem {
  id: string
  position: string
  description: string
  photos: UploadedFile[]
  quantity: string
  method: string
  responsibility: string
}

// 定义上传文件类型
interface UploadedFile {
  id: string
  type: "image" | "video"
  url: string
  name: string
}

export default function ReworkManagementPage() {
  // 基本信息状态
  const [noticeNumber, setNoticeNumber] = useState(`RG-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-001`)
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10))
  const [replyDate, setReplyDate] = useState("")
  const [factory, setFactory] = useState("南通大华")
  const [factoryContact, setFactoryContact] = useState("")
  const [factoryPhone, setFactoryPhone] = useState("")
  const [sender, setSender] = useState("易算云服装")
  const [senderContact, setSenderContact] = useState("")
  const [senderPhone, setSenderPhone] = useState("")

  // 订单信息状态
  const [orderNumber, setOrderNumber] = useState("")
  const [styleNumber, setStyleNumber] = useState("")
  const [colors, setColors] = useState("")
  const [sizes, setSizes] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [inspectionDate, setInspectionDate] = useState(new Date().toISOString().slice(0, 10))
  const [inspector, setInspector] = useState("")
  const [inspectionType, setInspectionType] = useState("抽检")
  const [sampleQuantity, setSampleQuantity] = useState("")
  const [totalQuantity, setTotalQuantity] = useState("")
  const [reworkQuantity, setReworkQuantity] = useState("")
  const [reportNumber, setReportNumber] = useState("")

  // 返工明细状态
  const [reworkItems, setReworkItems] = useState<ReworkItem[]>([
    {
      id: "1",
      position: "",
      description: "",
      photos: [],
      quantity: "",
      method: "",
      responsibility: "工厂",
    },
  ])

  // 返工要求状态
  const [reworkStandard, setReworkStandard] = useState("所有返工产品必须达到原订单确认样及技术资料包中规定的质量标准。")
  const [cleanlinessRequirement, setCleanlinessRequirement] = useState("确保返工产品无污渍、无破损、无线头，整烫平服。")
  const [materialsRequirement, setMaterialsRequirement] = useState(
    "如返工涉及辅料更换，必须使用与原订单要求一致的合格辅料。",
  )
  const [reworkDeadline, setReworkDeadline] = useState("")
  const [transportOption, setTransportOption] = useState("factory_pickup")
  const [transportCost, setTransportCost] = useState("factory")
  const [returnTransportCost, setReturnTransportCost] = useState("factory")
  const [reworkCost, setReworkCost] = useState("factory")
  const [additionalNotes, setAdditionalNotes] = useState("请加强生产过程中的质量控制，避免类似问题再次发生。")

  // 当前活动标签
  const [activeTab, setActiveTab] = useState("basic")

  // 添加返工项目
  const addReworkItem = () => {
    const newItem: ReworkItem = {
      id: Date.now().toString(),
      position: "",
      description: "",
      photos: [],
      quantity: "",
      method: "",
      responsibility: "工厂",
    }
    setReworkItems([...reworkItems, newItem])
  }

  // 更新返工项目
  const updateReworkItem = (id: string, field: keyof ReworkItem, value: any) => {
    setReworkItems(reworkItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  // 删除返工项目
  const removeReworkItem = (id: string) => {
    if (reworkItems.length > 1) {
      setReworkItems(reworkItems.filter((item) => item.id !== id))
    }
  }

  // 处理照片上传
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    if (!event.target.files || event.target.files.length === 0) return

    const newFiles: UploadedFile[] = Array.from(event.target.files).map((file) => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      type: file.type.startsWith("video/") ? "video" : "image",
      url: URL.createObjectURL(file),
      name: file.name,
    }))

    setReworkItems(
      reworkItems.map((item) => (item.id === itemId ? { ...item, photos: [...item.photos, ...newFiles] } : item)),
    )

    // 重置input，允许再次选择相同文件
    event.target.value = ""
  }

  // 删除照片
  const removePhoto = (itemId: string, photoId: string) => {
    setReworkItems(
      reworkItems.map((item) =>
        item.id === itemId ? { ...item, photos: item.photos.filter((photo) => photo.id !== photoId) } : item,
      ),
    )
  }

  // 计算总返工数量
  const calculateTotalReworkQuantity = () => {
    const total = reworkItems.reduce((sum, item) => {
      const qty = Number.parseInt(item.quantity) || 0
      return sum + qty
    }, 0)
    setReworkQuantity(total.toString())
  }

  // 提交返工通知单
  const handleSubmitNotice = () => {
    // 这里可以添加表单验证逻辑

    // 计算总返工数量
    calculateTotalReworkQuantity()

    // 模拟提交
    alert("返工通知单提交成功！")

    // 实际应用中，这里会调用API提交数据
    console.log({
      basicInfo: {
        noticeNumber,
        issueDate,
        replyDate,
        factory,
        factoryContact,
        factoryPhone,
        sender,
        senderContact,
        senderPhone,
      },
      orderInfo: {
        orderNumber,
        styleNumber,
        colors,
        sizes,
        deliveryDate,
        inspectionDate,
        inspector,
        inspectionType,
        sampleQuantity,
        totalQuantity,
        reworkQuantity,
        reportNumber,
      },
      reworkItems,
      requirements: {
        reworkStandard,
        cleanlinessRequirement,
        materialsRequirement,
        reworkDeadline,
        transportOption,
        transportCost,
        returnTransportCost,
        reworkCost,
        additionalNotes,
      },
    })
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between h-12 px-4 border-b bg-white sticky top-0 z-30 shadow-sm">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-base font-medium">返工管理</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => alert("通知单已保存为草稿")}>
            保存草稿
          </Button>
          <Button size="sm" className="h-8 text-xs bg-blue-500 hover:bg-blue-600" onClick={handleSubmitNotice}>
            发送通知单
          </Button>
        </div>
      </div>

      {/* 标签导航 */}
      <div className="bg-white border-b sticky top-12 z-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 h-10">
            <TabsTrigger value="basic" className="text-xs">
              基本信息
            </TabsTrigger>
            <TabsTrigger value="order" className="text-xs">
              订单信息
            </TabsTrigger>
            <TabsTrigger value="details" className="text-xs">
              返工明细
            </TabsTrigger>
            <TabsTrigger value="requirements" className="text-xs">
              返工要求
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <Tabs value={activeTab} className="w-full">
            {/* 基本信息标签内容 */}
            <TabsContent value="basic" className="m-0 space-y-4">
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="noticeNumber" className="text-xs text-gray-500 mb-1">
                        通知单编号
                      </Label>
                      <Input
                        id="noticeNumber"
                        value={noticeNumber}
                        onChange={(e) => setNoticeNumber(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="issueDate" className="text-xs text-gray-500 mb-1">
                        发出日期
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="issueDate"
                          type="date"
                          value={issueDate}
                          onChange={(e) => setIssueDate(e.target.value)}
                          className="text-sm h-9 pl-8 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="replyDate" className="text-xs text-gray-500 mb-1">
                      要求回复日期
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="replyDate"
                        type="date"
                        value={replyDate}
                        onChange={(e) => setReplyDate(e.target.value)}
                        className="text-sm h-9 pl-8 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="factory" className="text-xs text-gray-500 mb-1">
                      委外工厂名称
                    </Label>
                    <Select value={factory} onValueChange={setFactory}>
                      <SelectTrigger id="factory" className="h-9 text-sm border-gray-200">
                        <SelectValue placeholder="选择工厂" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="南通大华">南通大华</SelectItem>
                        <SelectItem value="常熟服装厂">常熟服装厂</SelectItem>
                        <SelectItem value="苏州制衣">苏州制衣</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="factoryContact" className="text-xs text-gray-500 mb-1">
                        工厂联系人
                      </Label>
                      <Input
                        id="factoryContact"
                        value={factoryContact}
                        onChange={(e) => setFactoryContact(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="请输入联系人姓名"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="factoryPhone" className="text-xs text-gray-500 mb-1">
                        联系电话
                      </Label>
                      <Input
                        id="factoryPhone"
                        value={factoryPhone}
                        onChange={(e) => setFactoryPhone(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="sender" className="text-xs text-gray-500 mb-1">
                      发件方
                    </Label>
                    <Input
                      id="sender"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      className="text-sm h-9 border-gray-200"
                      placeholder="请输入公司名称/部门"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="senderContact" className="text-xs text-gray-500 mb-1">
                        我方联系人
                      </Label>
                      <Input
                        id="senderContact"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="请输入联系人姓名"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="senderPhone" className="text-xs text-gray-500 mb-1">
                        联系电话
                      </Label>
                      <Input
                        id="senderPhone"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 订单信息标签内容 */}
            <TabsContent value="order" className="m-0 space-y-4">
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4 space-y-3">
                  <h2 className="text-sm font-medium mb-2 text-gray-700">订单基本信息</h2>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="orderNumber" className="text-xs text-gray-500 mb-1">
                        生产订单号
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="orderNumber"
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)}
                          className="text-sm h-9 border-gray-200 flex-1"
                          placeholder="请输入订单号"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 flex-shrink-0"
                          onClick={() => alert("搜索订单")}
                        >
                          <Search className="h-5 w-5 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="styleNumber" className="text-xs text-gray-500 mb-1">
                        款号/产品名称
                      </Label>
                      <Input
                        id="styleNumber"
                        value={styleNumber}
                        onChange={(e) => setStyleNumber(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="例如：女士衬衫/S2023001"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="colors" className="text-xs text-gray-500 mb-1">
                        颜色
                      </Label>
                      <Input
                        id="colors"
                        value={colors}
                        onChange={(e) => setColors(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="例如：白色、蓝色"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="sizes" className="text-xs text-gray-500 mb-1">
                        尺码
                      </Label>
                      <Input
                        id="sizes"
                        value={sizes}
                        onChange={(e) => setSizes(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="例如：S, M, L"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="deliveryDate" className="text-xs text-gray-500 mb-1">
                        原送货日期/批次
                      </Label>
                      <Input
                        id="deliveryDate"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="工厂送货日期或批次号"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="inspectionDate" className="text-xs text-gray-500 mb-1">
                        本次检验日期
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="inspectionDate"
                          type="date"
                          value={inspectionDate}
                          onChange={(e) => setInspectionDate(e.target.value)}
                          className="text-sm h-9 pl-8 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="inspector" className="text-xs text-gray-500 mb-1">
                      检验员
                    </Label>
                    <Input
                      id="inspector"
                      value={inspector}
                      onChange={(e) => setInspector(e.target.value)}
                      className="text-sm h-9 border-gray-200"
                      placeholder="请输入检验员姓名"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-xs text-gray-500 mb-1">检验方式</Label>
                    <RadioGroup value={inspectionType} onValueChange={setInspectionType} className="flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="抽检" id="sample-inspection" className="h-4 w-4" />
                        <Label htmlFor="sample-inspection" className="text-sm">
                          抽检
                        </Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="全检" id="full-inspection" className="h-4 w-4" />
                        <Label htmlFor="full-inspection" className="text-sm">
                          全检
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {inspectionType === "抽检" && (
                    <div className="flex flex-col">
                      <Label htmlFor="sampleQuantity" className="text-xs text-gray-500 mb-1">
                        抽检数量
                      </Label>
                      <Input
                        id="sampleQuantity"
                        type="number"
                        value={sampleQuantity}
                        onChange={(e) => setSampleQuantity(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="件"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="totalQuantity" className="text-xs text-gray-500 mb-1">
                        总送货数量
                      </Label>
                      <Input
                        id="totalQuantity"
                        type="number"
                        value={totalQuantity}
                        onChange={(e) => setTotalQuantity(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="件"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="reworkQuantity" className="text-xs text-gray-500 mb-1">
                        需返工总数量
                      </Label>
                      <Input
                        id="reworkQuantity"
                        type="number"
                        value={reworkQuantity}
                        onChange={(e) => setReworkQuantity(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                        placeholder="件"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="reportNumber" className="text-xs text-gray-500 mb-1">
                      相关检验报告编号 (如有)
                    </Label>
                    <Input
                      id="reportNumber"
                      value={reportNumber}
                      onChange={(e) => setReportNumber(e.target.value)}
                      className="text-sm h-9 border-gray-200"
                      placeholder="检验报告编号"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 返工明细标签内容 */}
            <TabsContent value="details" className="m-0 space-y-4">
              <div className="flex items-center justify-between px-1 mb-2">
                <h2 className="text-sm font-medium text-gray-700">返工明细及要求</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addReworkItem}
                  className="h-7 text-xs border-gray-200 hover:bg-gray-100"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  添加返工项
                </Button>
              </div>

              {reworkItems.map((item, index) => (
                <Card key={item.id} className="shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium">返工项 {index + 1}</h3>
                      {reworkItems.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReworkItem(item.id)}
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <Label htmlFor={`position-${item.id}`} className="text-xs text-gray-500 mb-1">
                          疵点位置/部件
                        </Label>
                        <Input
                          id={`position-${item.id}`}
                          value={item.position}
                          onChange={(e) => updateReworkItem(item.id, "position", e.target.value)}
                          className="text-sm h-9 border-gray-200"
                          placeholder="例如：前胸、袖口"
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor={`description-${item.id}`} className="text-xs text-gray-500 mb-1">
                          疵点描述
                        </Label>
                        <Textarea
                          id={`description-${item.id}`}
                          value={item.description}
                          onChange={(e) => updateReworkItem(item.id, "description", e.target.value)}
                          className="text-sm h-20 resize-none border-gray-200"
                          placeholder="请清晰、具体描述疵点，例如：面料有明显油污，面积约2cm x 3cm"
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-500 mb-1">不良图片参考</Label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-3 bg-gray-50">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {item.photos.map((photo) => (
                              <div key={photo.id} className="relative w-20 h-20 group">
                                {photo.type === "image" ? (
                                  <img
                                    src={photo.url || "/placeholder.svg"}
                                    alt={photo.name}
                                    className="w-full h-full object-cover rounded-md shadow-sm"
                                  />
                                ) : (
                                  <video src={photo.url} className="w-full h-full object-cover rounded-md shadow-sm" />
                                )}
                                <button
                                  onClick={() => removePhoto(item.id, photo.id)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            ))}

                            <label className="w-20 h-20 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors bg-white">
                              <Camera className="h-6 w-6 text-gray-400 mb-1" />
                              <span className="text-xs text-gray-500">上传</span>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => handlePhotoUpload(e, item.id)}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 text-center">点击上传照片，可多次上传</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <Label htmlFor={`quantity-${item.id}`} className="text-xs text-gray-500 mb-1">
                            不良数量 (件)
                          </Label>
                          <Input
                            id={`quantity-${item.id}`}
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              updateReworkItem(item.id, "quantity", e.target.value)
                              // 延迟计算总数，避免频繁更新
                              setTimeout(calculateTotalReworkQuantity, 500)
                            }}
                            className="text-sm h-9 border-gray-200"
                            placeholder="件"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor={`responsibility-${item.id}`} className="text-xs text-gray-500 mb-1">
                            责任方 (初步判定)
                          </Label>
                          <Select
                            value={item.responsibility}
                            onValueChange={(value) => updateReworkItem(item.id, "responsibility", value)}
                          >
                            <SelectTrigger id={`responsibility-${item.id}`} className="h-9 text-sm border-gray-200">
                              <SelectValue placeholder="选择责任方" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="工厂">工厂</SelectItem>
                              <SelectItem value="我方">我方</SelectItem>
                              <SelectItem value="待议">待议</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor={`method-${item.id}`} className="text-xs text-gray-500 mb-1">
                          建议返工方法/要求
                        </Label>
                        <Textarea
                          id={`method-${item.id}`}
                          value={item.method}
                          onChange={(e) => updateReworkItem(item.id, "method", e.target.value)}
                          className="text-sm h-20 resize-none border-gray-200"
                          placeholder="例如：尝试清洗，如无法清除则更换裁片"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* 返工要求标签内容 */}
            <TabsContent value="requirements" className="m-0 space-y-4">
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4 space-y-3">
                  <h2 className="text-sm font-medium mb-2 text-gray-700">返工总体要求</h2>

                  <div className="flex flex-col">
                    <Label htmlFor="reworkStandard" className="text-xs text-gray-500 mb-1">
                      返工标准
                    </Label>
                    <Textarea
                      id="reworkStandard"
                      value={reworkStandard}
                      onChange={(e) => setReworkStandard(e.target.value)}
                      className="text-sm h-16 resize-none border-gray-200"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="cleanlinessRequirement" className="text-xs text-gray-500 mb-1">
                      返工后产品清洁度
                    </Label>
                    <Textarea
                      id="cleanlinessRequirement"
                      value={cleanlinessRequirement}
                      onChange={(e) => setCleanlinessRequirement(e.target.value)}
                      className="text-sm h-16 resize-none border-gray-200"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="materialsRequirement" className="text-xs text-gray-500 mb-1">
                      辅料更换 (如需)
                    </Label>
                    <Textarea
                      id="materialsRequirement"
                      value={materialsRequirement}
                      onChange={(e) => setMaterialsRequirement(e.target.value)}
                      className="text-sm h-16 resize-none border-gray-200"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="reworkDeadline" className="text-xs text-gray-500 mb-1">
                      期望返工完成日期
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="reworkDeadline"
                        type="date"
                        value={reworkDeadline}
                        onChange={(e) => setReworkDeadline(e.target.value)}
                        className="text-sm h-9 pl-8 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-xs text-gray-500 mb-1">返工品运输</Label>
                    <RadioGroup value={transportOption} onValueChange={setTransportOption} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="we_return" id="we-return" className="h-4 w-4" />
                        <Label htmlFor="we-return" className="text-sm">
                          需返工产品由我方退回贵厂
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="factory_pickup" id="factory-pickup" className="h-4 w-4" />
                        <Label htmlFor="factory-pickup" className="text-sm">
                          需返工产品请贵厂派人上门提取
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-xs text-gray-500 mb-1">运输费用承担</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">送往工厂的运费由</span>
                        <Select value={transportCost} onValueChange={setTransportCost}>
                          <SelectTrigger className="h-8 text-sm border-gray-200 w-28">
                            <SelectValue placeholder="选择承担方" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="factory">贵厂</SelectItem>
                            <SelectItem value="we">我方</SelectItem>
                            <SelectItem value="negotiate">待协商</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm">承担</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">返工后运回的运费由</span>
                        <Select value={returnTransportCost} onValueChange={setReturnTransportCost}>
                          <SelectTrigger className="h-8 text-sm border-gray-200 w-28">
                            <SelectValue placeholder="选择承担方" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="factory">贵厂</SelectItem>
                            <SelectItem value="we">我方</SelectItem>
                            <SelectItem value="negotiate">待协商</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm">承担</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-xs text-gray-500 mb-1">返工成本</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">相关返工费用由</span>
                      <Select value={reworkCost} onValueChange={setReworkCost}>
                        <SelectTrigger className="h-8 text-sm border-gray-200 w-28">
                          <SelectValue placeholder="选择承担方" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="factory">贵厂</SelectItem>
                          <SelectItem value="we">我方</SelectItem>
                          <SelectItem value="negotiate">待协商</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm">承担</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="additionalNotes" className="text-xs text-gray-500 mb-1">
                      其他备注/说明
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="text-sm h-24 resize-none border-gray-200"
                      placeholder="例如：请贵厂加强生产过程中的质量控制，避免类似问题再次发生。"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="sticky bottom-0 p-3 bg-white border-t shadow-sm z-20">
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-4"
            onClick={() => {
              const prevTab = {
                basic: "basic",
                order: "basic",
                details: "order",
                requirements: "details",
              }[activeTab] as string

              setActiveTab(prevTab)
            }}
            disabled={activeTab === "basic"}
          >
            上一步
          </Button>
          <Button
            size="sm"
            className="h-10 px-4 bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              const nextTab = {
                basic: "order",
                order: "details",
                details: "requirements",
                requirements: "requirements",
              }[activeTab] as string

              if (nextTab === "requirements" && activeTab === "requirements") {
                handleSubmitNotice()
              } else {
                setActiveTab(nextTab)
              }
            }}
          >
            {activeTab === "requirements" ? (
              <div className="flex items-center">
                <Send className="h-4 w-4 mr-1" />
                发送通知单
              </div>
            ) : (
              "下一步"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
