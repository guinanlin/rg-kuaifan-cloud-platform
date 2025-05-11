"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, Plus, Trash2, Search, X, Camera, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// 定义缺陷记录类型
interface DefectRecord {
  id: string
  quantity: string
  type: string
  description: string
}

// 定义上传文件类型
interface UploadedFile {
  id: string
  type: "image" | "video"
  url: string
  name: string
}

export default function QCFinishingPage() {
  const [factory, setFactory] = useState("南通大华")
  const [searchTerm, setSearchTerm] = useState("")
  const [expectedQuantity, setExpectedQuantity] = useState("")
  const [actualQuantity, setActualQuantity] = useState("")
  const [shortageQuantity, setShortageQuantity] = useState("")
  const [qualifiedQuantity, setQualifiedQuantity] = useState("200")
  const [defectRecords, setDefectRecords] = useState<DefectRecord[]>([
    { id: "1", quantity: "300", type: "", description: "" },
  ])
  const [showSearchPanel, setShowSearchPanel] = useState(false)
  const [qualifiedFiles, setQualifiedFiles] = useState<UploadedFile[]>([])
  const [defectFiles, setDefectFiles] = useState<Record<string, UploadedFile[]>>({})
  const [returnDate, setReturnDate] = useState("2025-10-30")
  const [activeTab, setActiveTab] = useState("info")

  // 模拟订单数据
  const orderData = {
    outsourceId: "IOS-0001",
    styleNumber: "IOS-0001",
    manager: "李敏",
    dueDate: "2025-10-30",
    quantity: 13000,
    returnDate: "2025-10-30",
  }

  // 计算缺口数
  useEffect(() => {
    if (expectedQuantity && actualQuantity) {
      const shortage = Number.parseInt(expectedQuantity) - Number.parseInt(actualQuantity)
      setShortageQuantity(shortage > 0 ? shortage.toString() : "0")
    }
  }, [expectedQuantity, actualQuantity])

  const handleSearch = () => {
    console.log("搜索条件:", searchTerm)
    setShowSearchPanel(false)
  }

  const handleGenerateReport = () => {
    alert("生成后道成品检验报告")
  }

  const addDefectRecord = () => {
    const newRecord: DefectRecord = {
      id: Date.now().toString(),
      quantity: "",
      type: "",
      description: "",
    }
    setDefectRecords([...defectRecords, newRecord])
  }

  const updateDefectRecord = (id: string, field: keyof DefectRecord, value: string) => {
    setDefectRecords(defectRecords.map((record) => (record.id === id ? { ...record, [field]: value } : record)))
  }

  const removeDefectRecord = (id: string) => {
    if (defectRecords.length > 1) {
      setDefectRecords(defectRecords.filter((record) => record.id !== id))
    }
  }

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "qualified" | "defect",
    defectId?: string,
  ) => {
    if (!event.target.files || event.target.files.length === 0) return

    const newFiles: UploadedFile[] = Array.from(event.target.files).map((file) => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      type: file.type.startsWith("video/") ? "video" : "image",
      url: URL.createObjectURL(file),
      name: file.name,
    }))

    if (type === "qualified") {
      setQualifiedFiles((prev) => [...prev, ...newFiles])
    } else if (defectId) {
      setDefectFiles((prev) => ({
        ...prev,
        [defectId]: [...(prev[defectId] || []), ...newFiles],
      }))
    }

    // 重置input，允许再次选择相同文件
    event.target.value = ""
  }

  const removeFile = (fileId: string, type: "qualified" | "defect", defectId?: string) => {
    if (type === "qualified") {
      setQualifiedFiles((prev) => prev.filter((file) => file.id !== fileId))
    } else if (defectId) {
      setDefectFiles((prev) => ({
        ...prev,
        [defectId]: prev[defectId]?.filter((file) => file.id !== fileId) || [],
      }))
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center h-12 px-4 border-b bg-white sticky top-0 z-30 shadow-sm">
        <Link href="/" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-medium">后道成品检验</h1>
      </div>

      {/* 工厂选择和搜索栏 */}
      <div className="px-4 py-3 bg-white sticky top-12 z-20 border-b shadow-sm">
        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-3">
            <Select value={factory} onValueChange={setFactory}>
              <SelectTrigger className="h-9 text-sm border-gray-200 w-full">
                <SelectValue placeholder="选择工厂" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="南通大华">南通大华</SelectItem>
                <SelectItem value="常熟服装厂">常熟服装厂</SelectItem>
                <SelectItem value="苏州制衣">苏州制衣</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-6 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索订单号/款号"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 pl-8 text-sm border-gray-200 w-full"
            />
          </div>
          <div className="col-span-3">
            <Button
              size="sm"
              variant="default"
              className="h-9 bg-blue-500 hover:bg-blue-600 w-full"
              onClick={handleSearch}
            >
              查询
            </Button>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          {/* 订单信息卡片 */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                <span className="w-1 h-4 bg-blue-500 mr-2 rounded-sm"></span>
                订单信息
              </h2>
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-12 flex-shrink-0">外协号：</span>
                  <span className="text-sm font-medium truncate">{orderData.outsourceId}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-12 flex-shrink-0">款号：</span>
                  <span className="text-sm font-medium truncate">{orderData.styleNumber}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-12 flex-shrink-0">跟单：</span>
                  <span className="text-sm font-medium truncate">{orderData.manager}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-12 flex-shrink-0">交期：</span>
                  <span className="text-sm font-medium truncate">{orderData.dueDate}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-12 flex-shrink-0">数量：</span>
                  <span className="text-sm font-medium truncate">{orderData.quantity}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 w-12 flex-shrink-0">回厂日期：</span>
                  <div className="relative flex-1 max-w-[110px]">
                    <Input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="text-xs h-7 pl-6 pr-1 border-gray-200 w-full"
                    />
                    <Calendar className="absolute left-1 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 数量信息卡片 */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                <span className="w-1 h-4 bg-blue-500 mr-2 rounded-sm"></span>
                数量信息
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="expectedQuantity" className="text-xs text-gray-500 mb-1">
                      预计回厂数量
                    </Label>
                    <Input
                      id="expectedQuantity"
                      type="number"
                      value={expectedQuantity}
                      onChange={(e) => setExpectedQuantity(e.target.value)}
                      className="text-sm h-9 border-gray-200"
                      placeholder="请输入"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="actualQuantity" className="text-xs text-gray-500 mb-1">
                      实际回厂数量
                    </Label>
                    <Input
                      id="actualQuantity"
                      type="number"
                      value={actualQuantity}
                      onChange={(e) => setActualQuantity(e.target.value)}
                      className="text-sm h-9 border-gray-200"
                      placeholder="请输入"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="shortageQuantity" className="text-xs text-gray-500 mb-1">
                      缺口数
                    </Label>
                    <Input
                      id="shortageQuantity"
                      type="number"
                      value={shortageQuantity}
                      readOnly
                      className="text-sm h-9 bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="qualifiedQuantity" className="text-xs text-gray-500 mb-1">
                    合格品数量
                  </Label>
                  <Input
                    id="qualifiedQuantity"
                    type="number"
                    value={qualifiedQuantity}
                    onChange={(e) => setQualifiedQuantity(e.target.value)}
                    className="text-sm h-9 border-gray-200"
                    placeholder="请输入"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 合格品上传区域 */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                <span className="w-1 h-4 bg-green-500 mr-2 rounded-sm"></span>
                合格品照片/视频
              </h2>
              <div className="border border-dashed border-gray-300 rounded-lg p-3 bg-gray-50">
                <div className="flex flex-wrap gap-2 mb-2">
                  {qualifiedFiles.map((file) => (
                    <div key={file.id} className="relative w-20 h-20 group">
                      {file.type === "image" ? (
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-full object-cover rounded-md shadow-sm"
                        />
                      ) : (
                        <video src={file.url} className="w-full h-full object-cover rounded-md shadow-sm" />
                      )}
                      <button
                        onClick={() => removeFile(file.id, "qualified")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  <label className="w-20 h-20 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors bg-white">
                    <Camera className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">上传</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "qualified")}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 text-center">点击上传视频/图片，可多次上传</p>
              </div>
            </CardContent>
          </Card>

          {/* 缺陷品记录 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-medium text-gray-700 flex items-center">
                <span className="w-1 h-4 bg-red-500 mr-2 rounded-sm"></span>
                缺陷品记录
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={addDefectRecord}
                className="h-7 text-xs border-gray-200 hover:bg-gray-100"
              >
                <Plus className="h-3 w-3 mr-1" />
                添加记录
              </Button>
            </div>

            {defectRecords.map((record, index) => (
              <Card key={record.id} className="shadow-sm border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Label htmlFor={`defectQuantity-${record.id}`} className="text-xs text-gray-500 mr-2">
                        缺陷数量：
                      </Label>
                      <Input
                        id={`defectQuantity-${record.id}`}
                        type="number"
                        value={record.quantity}
                        onChange={(e) => updateDefectRecord(record.id, "quantity", e.target.value)}
                        className="w-20 h-7 text-sm border-gray-200"
                      />
                    </div>
                    {defectRecords.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDefectRecord(record.id)}
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label htmlFor={`defectType-${record.id}`} className="text-xs text-gray-500 mb-1 block">
                        缺陷类型：
                      </Label>
                      <Select
                        value={record.type}
                        onValueChange={(value) => updateDefectRecord(record.id, "type", value)}
                      >
                        <SelectTrigger id={`defectType-${record.id}`} className="h-8 text-sm border-gray-200">
                          <SelectValue placeholder="选择缺陷类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="尺寸问题">尺寸问题</SelectItem>
                          <SelectItem value="颜色问题">颜色问题</SelectItem>
                          <SelectItem value="缝制问题">缝制问题</SelectItem>
                          <SelectItem value="材料问题">材料问题</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`defectDescription-${record.id}`} className="text-xs text-gray-500 mb-1 block">
                        缺陷描述：
                      </Label>
                      <Textarea
                        id={`defectDescription-${record.id}`}
                        value={record.description}
                        onChange={(e) => updateDefectRecord(record.id, "description", e.target.value)}
                        className="h-16 text-sm resize-none border-gray-200"
                        placeholder="请描述缺陷详情..."
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">缺陷照片/视频：</Label>
                      <div className="border border-dashed border-gray-300 rounded-md p-2 bg-gray-50">
                        <div className="flex flex-wrap gap-2 mb-1">
                          {(defectFiles[record.id] || []).map((file) => (
                            <div key={file.id} className="relative w-16 h-16 group">
                              {file.type === "image" ? (
                                <img
                                  src={file.url || "/placeholder.svg"}
                                  alt={file.name}
                                  className="w-full h-full object-cover rounded-md shadow-sm"
                                />
                              ) : (
                                <video src={file.url} className="w-full h-full object-cover rounded-md shadow-sm" />
                              )}
                              <button
                                onClick={() => removeFile(file.id, "defect", record.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}

                          <label className="w-16 h-16 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors bg-white">
                            <Camera className="h-5 w-5 text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500">上传</span>
                            <input
                              type="file"
                              accept="image/*,video/*"
                              multiple
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "defect", record.id)}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 text-center">点击上传视频/图片</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="sticky bottom-0 p-3 bg-white border-t shadow-sm z-20">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 h-10 font-medium" onClick={handleGenerateReport}>
          出具后道成品检验报告
        </Button>
      </div>
    </div>
  )
}
