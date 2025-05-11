"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Plus, Trash2, Camera, Calendar, Clock, Check, X, Barcode } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// 定义问题记录类型
interface ProblemRecord {
  id: string
  description: string
  quantity: string
  severity: string
  photos: UploadedFile[]
}

// 定义上传文件类型
interface UploadedFile {
  id: string
  type: "image" | "video"
  url: string
  name: string
}

// 定义检查项目类型
interface CheckItem {
  id: string
  category: string
  subcategory: string
  standard: string
  result: "pass" | "fail" | "na"
  failCount: string
  remark: string
}

export default function QCPatrolPage() {
  // 基本信息状态
  const [reportNumber, setReportNumber] = useState(`QC-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-001`)
  const [patrolDate, setPatrolDate] = useState(new Date().toISOString().slice(0, 10))
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [inspector, setInspector] = useState("")
  const [factory, setFactory] = useState("南通大华")
  const [orderNumber, setOrderNumber] = useState("")
  const [productName, setProductName] = useState("")
  const [processStage, setProcessStage] = useState("")
  const [sampleQuantity, setSampleQuantity] = useState("")
  const [totalQuantity, setTotalQuantity] = useState("")

  // 检查项目状态
  const [checkItems, setCheckItems] = useState<CheckItem[]>([
    // 面辅料
    {
      id: "1.1",
      category: "面辅料",
      subcategory: "面料质量（颜色、手感、瑕疵）",
      standard: "与确认样一致，无色差、污渍、破损、纱结、异味等",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "1.2",
      category: "面辅料",
      subcategory: "辅料质量（拉链、纽扣、唛头等）",
      standard: "型号、颜色、质量符合要求，功能正常",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "1.3",
      category: "面辅料",
      subcategory: "对格/对条 (如适用)",
      standard: "对位准确，符合工艺要求",
      result: "pass",
      failCount: "",
      remark: "",
    },

    // 工艺制作
    {
      id: "2.1",
      category: "工艺制作",
      subcategory: "针距、线迹",
      standard: "均匀、平整，无跳针、断线、浮线、抽纱等",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "2.2",
      category: "工艺制作",
      subcategory: "缝合牢固度",
      standard: "接缝牢固，无开裂、爆口",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "2.3",
      category: "工艺制作",
      subcategory: "部件组合",
      standard: "对称、平服，无扭曲、起皱",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "2.4",
      category: "工艺制作",
      subcategory: "锁眼钉扣",
      standard: "位置准确，牢固美观，扣眼大小适宜",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "2.5",
      category: "工艺制作",
      subcategory: "特殊工艺 (绣花、印花等)",
      standard: "位置准确，图案清晰，无瑕疵",
      result: "pass",
      failCount: "",
      remark: "",
    },

    // 尺寸规格
    {
      id: "3.1",
      category: "尺寸规格",
      subcategory: "主要部位尺寸",
      standard: "符合规格表公差范围",
      result: "pass",
      failCount: "",
      remark: "",
    },

    // 外观整理
    {
      id: "4.1",
      category: "外观整理",
      subcategory: "整烫效果",
      standard: "平服，无烫黄、极光、水渍",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "4.2",
      category: "外观整理",
      subcategory: "清洁度",
      standard: "无污渍、线头、粉印、油渍等",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "4.3",
      category: "外观整理",
      subcategory: "整体形态",
      standard: "外观平整，形态良好",
      result: "pass",
      failCount: "",
      remark: "",
    },

    // 标识与包装
    {
      id: "5.1",
      category: "标识与包装",
      subcategory: "洗唛、吊牌",
      standard: "内容正确，位置准确，悬挂规范",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "5.2",
      category: "标识与包装",
      subcategory: "包装方式",
      standard: "符合客户要求，包装整洁、牢固",
      result: "pass",
      failCount: "",
      remark: "",
    },

    // 生产现场管理
    {
      id: "6.1",
      category: "生产现场管理",
      subcategory: "机台清洁与维护",
      standard: "设备清洁，保养记录",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "6.2",
      category: "生产现场管理",
      subcategory: "半成品/成品堆放",
      standard: "分类有序，避免挤压、污染",
      result: "pass",
      failCount: "",
      remark: "",
    },
    {
      id: "6.3",
      category: "生产现场管理",
      subcategory: "现场5S情况",
      standard: "整理、整顿、清扫、清洁、素养",
      result: "pass",
      failCount: "",
      remark: "",
    },
  ])

  // 问题记录状态
  const [problems, setProblems] = useState<ProblemRecord[]>([
    { id: "1", description: "", quantity: "", severity: "轻微", photos: [] },
  ])

  // 结论与建议状态
  const [overallEvaluation, setOverallEvaluation] = useState("基本合格，个别问题需立即整改")
  const [recommendations, setRecommendations] = useState("")
  const [needRecheck, setNeedRecheck] = useState("是")
  const [recheckDate, setRecheckDate] = useState("")

  // 当前活动标签
  const [activeTab, setActiveTab] = useState("basic")

  // 更新检查项目结果
  const updateCheckItemResult = (id: string, result: "pass" | "fail" | "na") => {
    setCheckItems(checkItems.map((item) => (item.id === id ? { ...item, result } : item)))
  }

  // 更新检查项目不合格数量
  const updateCheckItemFailCount = (id: string, failCount: string) => {
    setCheckItems(checkItems.map((item) => (item.id === id ? { ...item, failCount } : item)))
  }

  // 更新检查项目备注
  const updateCheckItemRemark = (id: string, remark: string) => {
    setCheckItems(checkItems.map((item) => (item.id === id ? { ...item, remark } : item)))
  }

  // 添加问题记录
  const addProblem = () => {
    const newProblem: ProblemRecord = {
      id: Date.now().toString(),
      description: "",
      quantity: "",
      severity: "轻微",
      photos: [],
    }
    setProblems([...problems, newProblem])
  }

  // 更新问题记录
  const updateProblem = (id: string, field: keyof ProblemRecord, value: any) => {
    setProblems(problems.map((problem) => (problem.id === id ? { ...problem, [field]: value } : problem)))
  }

  // 删除问题记录
  const removeProblem = (id: string) => {
    if (problems.length > 1) {
      setProblems(problems.filter((problem) => problem.id !== id))
    }
  }

  // 处理照片上传
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, problemId: string) => {
    if (!event.target.files || event.target.files.length === 0) return

    const newFiles: UploadedFile[] = Array.from(event.target.files).map((file) => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      type: file.type.startsWith("video/") ? "video" : "image",
      url: URL.createObjectURL(file),
      name: file.name,
    }))

    setProblems(
      problems.map((problem) =>
        problem.id === problemId ? { ...problem, photos: [...problem.photos, ...newFiles] } : problem,
      ),
    )

    // 重置input，允许再次选择相同文件
    event.target.value = ""
  }

  // 删除照片
  const removePhoto = (problemId: string, photoId: string) => {
    setProblems(
      problems.map((problem) =>
        problem.id === problemId
          ? { ...problem, photos: problem.photos.filter((photo) => photo.id !== photoId) }
          : problem,
      ),
    )
  }

  // 提交报告
  const handleSubmitReport = () => {
    // 这里可以添加表单验证逻辑

    // 模拟提交
    alert("QC巡查报告提交成功！")

    // 实际应用中，这里会调用API提交数据
    console.log({
      basicInfo: {
        reportNumber,
        patrolDate,
        timeRange: { startTime, endTime },
        inspector,
        factory,
        orderNumber,
        productName,
        processStage,
        sampleQuantity,
        totalQuantity,
      },
      checkItems,
      problems,
      conclusion: {
        overallEvaluation,
        recommendations,
        needRecheck,
        recheckDate,
      },
    })
  }

  // 处理扫码
  const handleScanBarcode = () => {
    // 这里可以添加扫描条形码的逻辑
    alert("启动条形码扫描")
  }

  // 获取按类别分组的检查项目
  const getCheckItemsByCategory = (category: string) => {
    return checkItems.filter((item) => item.category === category)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between h-12 px-4 border-b bg-white sticky top-0 z-30 shadow-sm">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-base font-medium">QC巡查</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => alert("报告已保存为草稿")}>
            保存草稿
          </Button>
          <Button size="sm" className="h-8 text-xs bg-blue-500 hover:bg-blue-600" onClick={handleSubmitReport}>
            提交报告
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
            <TabsTrigger value="check" className="text-xs">
              巡查要点
            </TabsTrigger>
            <TabsTrigger value="problems" className="text-xs">
              问题记录
            </TabsTrigger>
            <TabsTrigger value="conclusion" className="text-xs">
              结论建议
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
                      <Label htmlFor="reportNumber" className="text-xs text-gray-500 mb-1">
                        报告编号
                      </Label>
                      <Input
                        id="reportNumber"
                        value={reportNumber}
                        onChange={(e) => setReportNumber(e.target.value)}
                        className="text-sm h-9 border-gray-200"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="patrolDate" className="text-xs text-gray-500 mb-1">
                        巡查日期
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="patrolDate"
                          type="date"
                          value={patrolDate}
                          onChange={(e) => setPatrolDate(e.target.value)}
                          className="text-sm h-9 pl-8 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="startTime" className="text-xs text-gray-500 mb-1">
                        开始时间
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="startTime"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="text-sm h-9 pl-8 border-gray-200"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="endTime" className="text-xs text-gray-500 mb-1">
                        结束时间
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="endTime"
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="text-sm h-9 pl-8 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="inspector" className="text-xs text-gray-500 mb-1">
                      巡查员
                    </Label>
                    <Input
                      id="inspector"
                      value={inspector}
                      onChange={(e) => setInspector(e.target.value)}
                      className="text-sm h-9 border-gray-200"
                      placeholder="请输入巡查员姓名"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="factory" className="text-xs text-gray-500 mb-1">
                      被巡查工厂/车间
                    </Label>
                    <Select value={factory} onValueChange={setFactory}>
                      <SelectTrigger id="factory" className="h-9 text-sm border-gray-200">
                        <SelectValue placeholder="选择工厂/车间" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="南通大华">南通大华</SelectItem>
                        <SelectItem value="常熟服装厂">常熟服装厂</SelectItem>
                        <SelectItem value="苏州制衣">苏州制衣</SelectItem>
                        <SelectItem value="南通大华-一号车间">南通大华-一号车间</SelectItem>
                        <SelectItem value="南通大华-二号车间">南通大华-二号车间</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="orderNumber" className="text-xs text-gray-500 mb-1">
                      生产订单号/款号
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className="text-sm h-9 border-gray-200 flex-1"
                        placeholder="请输入订单号或款号"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 flex-shrink-0"
                        onClick={handleScanBarcode}
                      >
                        <Barcode className="h-5 w-5 text-gray-600" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="productName" className="text-xs text-gray-500 mb-1">
                      巡查产品名称
                    </Label>
                    <Input
                      id="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="text-sm h-9 border-gray-200"
                      placeholder="例如：女士连衣裙"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="processStage" className="text-xs text-gray-500 mb-1">
                      巡查工序/阶段
                    </Label>
                    <Select value={processStage} onValueChange={setProcessStage}>
                      <SelectTrigger id="processStage" className="h-9 text-sm border-gray-200">
                        <SelectValue placeholder="选择工序/阶段" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="裁剪">裁剪</SelectItem>
                        <SelectItem value="缝制中查">缝制中查</SelectItem>
                        <SelectItem value="后整">后整</SelectItem>
                        <SelectItem value="包装前">包装前</SelectItem>
                        <SelectItem value="出货前">出货前</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <Label htmlFor="sampleQuantity" className="text-xs text-gray-500 mb-1">
                        本次抽检数量
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
                    <div className="flex flex-col">
                      <Label htmlFor="totalQuantity" className="text-xs text-gray-500 mb-1">
                        订单总数/批次数
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 巡查要点标签内容 */}
            <TabsContent value="check" className="m-0 space-y-4">
              {/* 面辅料 */}
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4">
                  <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                    <span className="w-1 h-4 bg-blue-500 mr-2 rounded-sm"></span>
                    1. 面辅料
                  </h2>

                  {getCheckItemsByCategory("面辅料").map((item) => (
                    <div key={item.id} className="border-b border-gray-100 py-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.subcategory}</p>
                          <p className="text-xs text-gray-500">{item.standard}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "pass" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "pass")}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "fail" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "fail")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "na" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "na")}
                          >
                            <span className="text-xs font-medium">N/A</span>
                          </button>
                        </div>
                      </div>

                      {item.result === "fail" && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex flex-col">
                            <Label htmlFor={`failCount-${item.id}`} className="text-xs text-gray-500 mb-1">
                              不合格数量
                            </Label>
                            <Input
                              id={`failCount-${item.id}`}
                              type="number"
                              value={item.failCount}
                              onChange={(e) => updateCheckItemFailCount(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="件"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor={`remark-${item.id}`} className="text-xs text-gray-500 mb-1">
                              备注/问题描述
                            </Label>
                            <Input
                              id={`remark-${item.id}`}
                              value={item.remark}
                              onChange={(e) => updateCheckItemRemark(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="简要描述问题"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 工艺制作 */}
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4">
                  <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                    <span className="w-1 h-4 bg-blue-500 mr-2 rounded-sm"></span>
                    2. 工艺制作
                  </h2>

                  {getCheckItemsByCategory("工艺制作").map((item) => (
                    <div key={item.id} className="border-b border-gray-100 py-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.subcategory}</p>
                          <p className="text-xs text-gray-500">{item.standard}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "pass" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "pass")}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "fail" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "fail")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "na" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "na")}
                          >
                            <span className="text-xs font-medium">N/A</span>
                          </button>
                        </div>
                      </div>

                      {item.result === "fail" && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex flex-col">
                            <Label htmlFor={`failCount-${item.id}`} className="text-xs text-gray-500 mb-1">
                              不合格数量
                            </Label>
                            <Input
                              id={`failCount-${item.id}`}
                              type="number"
                              value={item.failCount}
                              onChange={(e) => updateCheckItemFailCount(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="件"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor={`remark-${item.id}`} className="text-xs text-gray-500 mb-1">
                              备注/问题描述
                            </Label>
                            <Input
                              id={`remark-${item.id}`}
                              value={item.remark}
                              onChange={(e) => updateCheckItemRemark(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="简要描述问题"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 尺寸规格 */}
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4">
                  <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                    <span className="w-1 h-4 bg-blue-500 mr-2 rounded-sm"></span>
                    3. 尺寸规格
                  </h2>

                  {getCheckItemsByCategory("尺寸规格").map((item) => (
                    <div key={item.id} className="border-b border-gray-100 py-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.subcategory}</p>
                          <p className="text-xs text-gray-500">{item.standard}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "pass" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "pass")}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "fail" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "fail")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "na" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "na")}
                          >
                            <span className="text-xs font-medium">N/A</span>
                          </button>
                        </div>
                      </div>

                      {item.result === "fail" && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex flex-col">
                            <Label htmlFor={`failCount-${item.id}`} className="text-xs text-gray-500 mb-1">
                              不合格数量
                            </Label>
                            <Input
                              id={`failCount-${item.id}`}
                              type="number"
                              value={item.failCount}
                              onChange={(e) => updateCheckItemFailCount(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="件"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor={`remark-${item.id}`} className="text-xs text-gray-500 mb-1">
                              备注/问题描述
                            </Label>
                            <Input
                              id={`remark-${item.id}`}
                              value={item.remark}
                              onChange={(e) => updateCheckItemRemark(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="例如：胸围+1cm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 外观整理 */}
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4">
                  <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                    <span className="w-1 h-4 bg-blue-500 mr-2 rounded-sm"></span>
                    4. 外观整理
                  </h2>

                  {getCheckItemsByCategory("外观整理").map((item) => (
                    <div key={item.id} className="border-b border-gray-100 py-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.subcategory}</p>
                          <p className="text-xs text-gray-500">{item.standard}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "pass" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "pass")}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "fail" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "fail")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "na" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "na")}
                          >
                            <span className="text-xs font-medium">N/A</span>
                          </button>
                        </div>
                      </div>

                      {item.result === "fail" && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex flex-col">
                            <Label htmlFor={`failCount-${item.id}`} className="text-xs text-gray-500 mb-1">
                              不合格数量
                            </Label>
                            <Input
                              id={`failCount-${item.id}`}
                              type="number"
                              value={item.failCount}
                              onChange={(e) => updateCheckItemFailCount(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="件"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor={`remark-${item.id}`} className="text-xs text-gray-500 mb-1">
                              备注/问题描述
                            </Label>
                            <Input
                              id={`remark-${item.id}`}
                              value={item.remark}
                              onChange={(e) => updateCheckItemRemark(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="简要描述问题"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 标识与包装 */}
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4">
                  <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                    <span className="w-1 h-4 bg-blue-500 mr-2 rounded-sm"></span>
                    5. 标识与包装
                  </h2>

                  {getCheckItemsByCategory("标识与包装").map((item) => (
                    <div key={item.id} className="border-b border-gray-100 py-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.subcategory}</p>
                          <p className="text-xs text-gray-500">{item.standard}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "pass" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "pass")}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "fail" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "fail")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "na" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "na")}
                          >
                            <span className="text-xs font-medium">N/A</span>
                          </button>
                        </div>
                      </div>

                      {item.result === "fail" && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex flex-col">
                            <Label htmlFor={`failCount-${item.id}`} className="text-xs text-gray-500 mb-1">
                              不合格数量
                            </Label>
                            <Input
                              id={`failCount-${item.id}`}
                              type="number"
                              value={item.failCount}
                              onChange={(e) => updateCheckItemFailCount(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="件"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor={`remark-${item.id}`} className="text-xs text-gray-500 mb-1">
                              备注/问题描述
                            </Label>
                            <Input
                              id={`remark-${item.id}`}
                              value={item.remark}
                              onChange={(e) => updateCheckItemRemark(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="简要描述问题"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 生产现场管理 */}
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4">
                  <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                    <span className="w-1 h-4 bg-blue-500 mr-2 rounded-sm"></span>
                    6. 生产现场管理
                  </h2>

                  {getCheckItemsByCategory("生产现场管理").map((item) => (
                    <div key={item.id} className="border-b border-gray-100 py-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.subcategory}</p>
                          <p className="text-xs text-gray-500">{item.standard}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "pass" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "pass")}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "fail" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "fail")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              item.result === "na" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => updateCheckItemResult(item.id, "na")}
                          >
                            <span className="text-xs font-medium">N/A</span>
                          </button>
                        </div>
                      </div>

                      {item.result === "fail" && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex flex-col">
                            <Label htmlFor={`failCount-${item.id}`} className="text-xs text-gray-500 mb-1">
                              不合格数量
                            </Label>
                            <Input
                              id={`failCount-${item.id}`}
                              type="number"
                              value={item.failCount}
                              onChange={(e) => updateCheckItemFailCount(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="件"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor={`remark-${item.id}`} className="text-xs text-gray-500 mb-1">
                              备注/问题描述
                            </Label>
                            <Input
                              id={`remark-${item.id}`}
                              value={item.remark}
                              onChange={(e) => updateCheckItemRemark(item.id, e.target.value)}
                              className="text-xs h-7 border-gray-200"
                              placeholder="简要描述问题"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 问题记录标签内容 */}
            <TabsContent value="problems" className="m-0 space-y-4">
              <div className="flex items-center justify-between px-1 mb-2">
                <h2 className="text-sm font-medium text-gray-700">主要问题点汇总及照片</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addProblem}
                  className="h-7 text-xs border-gray-200 hover:bg-gray-100"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  添加问题
                </Button>
              </div>

              {problems.map((problem, index) => (
                <Card key={problem.id} className="shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium">问题 {index + 1}</h3>
                      {problems.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProblem(problem.id)}
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <Label htmlFor={`problem-desc-${problem.id}`} className="text-xs text-gray-500 mb-1">
                          问题描述
                        </Label>
                        <Textarea
                          id={`problem-desc-${problem.id}`}
                          value={problem.description}
                          onChange={(e) => updateProblem(problem.id, "description", e.target.value)}
                          className="text-sm h-20 resize-none border-gray-200"
                          placeholder="详细描述问题，例如：后中缝线迹不直，部分区域有轻微抽纱"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <Label htmlFor={`problem-qty-${problem.id}`} className="text-xs text-gray-500 mb-1">
                            涉及数量
                          </Label>
                          <Input
                            id={`problem-qty-${problem.id}`}
                            type="number"
                            value={problem.quantity}
                            onChange={(e) => updateProblem(problem.id, "quantity", e.target.value)}
                            className="text-sm h-9 border-gray-200"
                            placeholder="件"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor={`problem-severity-${problem.id}`} className="text-xs text-gray-500 mb-1">
                            严重程度
                          </Label>
                          <Select
                            value={problem.severity}
                            onValueChange={(value) => updateProblem(problem.id, "severity", value)}
                          >
                            <SelectTrigger
                              id={`problem-severity-${problem.id}`}
                              className="h-9 text-sm border-gray-200"
                            >
                              <SelectValue placeholder="选择严重程度" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="轻微">轻微</SelectItem>
                              <SelectItem value="一般">一般</SelectItem>
                              <SelectItem value="严重">严重</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-500 mb-1">问题照片</Label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-3 bg-gray-50">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {problem.photos.map((photo) => (
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
                                  onClick={() => removePhoto(problem.id, photo.id)}
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
                                onChange={(e) => handlePhotoUpload(e, problem.id)}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 text-center">点击上传照片，可多次上传</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* 结论建议标签内容 */}
            <TabsContent value="conclusion" className="m-0 space-y-4">
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4 space-y-3">
                  <h2 className="text-sm font-medium mb-2 text-gray-700">巡查结论与建议</h2>

                  <div className="flex flex-col">
                    <Label htmlFor="overallEvaluation" className="text-xs text-gray-500 mb-1">
                      整体评价
                    </Label>
                    <Select value={overallEvaluation} onValueChange={setOverallEvaluation}>
                      <SelectTrigger id="overallEvaluation" className="h-9 text-sm border-gray-200">
                        <SelectValue placeholder="选择整体评价" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="基本合格，个别问题需立即整改">基本合格，个别问题需立即整改</SelectItem>
                        <SelectItem value="存在较多问题，需重点跟进">存在较多问题，需重点跟进</SelectItem>
                        <SelectItem value="严重不合格，建议停线整改">严重不合格，建议停线整改</SelectItem>
                        <SelectItem value="完全合格，可以继续生产">完全合格，可以继续生产</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="recommendations" className="text-xs text-gray-500 mb-1">
                      处理建议
                    </Label>
                    <Textarea
                      id="recommendations"
                      value={recommendations}
                      onChange={(e) => setRecommendations(e.target.value)}
                      className="text-sm h-32 resize-none border-gray-200"
                      placeholder="针对发现的问题提出具体的纠正措施，例如：对XX问题产品进行返修；加强对XX工序的自检和互检；要求XX工段负责人立即组织培训"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-xs text-gray-500 mb-1">是否需要复查</Label>
                    <RadioGroup value={needRecheck} onValueChange={setNeedRecheck} className="flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="是" id="recheck-yes" className="h-4 w-4" />
                        <Label htmlFor="recheck-yes" className="text-sm">
                          是
                        </Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="否" id="recheck-no" className="h-4 w-4" />
                        <Label htmlFor="recheck-no" className="text-sm">
                          否
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {needRecheck === "是" && (
                    <div className="flex flex-col">
                      <Label htmlFor="recheckDate" className="text-xs text-gray-500 mb-1">
                        复查时间
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="recheckDate"
                          type="date"
                          value={recheckDate}
                          onChange={(e) => setRecheckDate(e.target.value)}
                          className="text-sm h-9 pl-8 border-gray-200"
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t mt-4">
                    <h3 className="text-sm font-medium mb-3">相关人员签字</h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-500 mb-1">巡查员</Label>
                        <div className="h-16 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">点击此处签名</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-500 mb-1">车间/工厂负责人</Label>
                        <div className="h-16 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">点击此处签名</span>
                        </div>
                      </div>
                    </div>
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
                check: "basic",
                problems: "check",
                conclusion: "problems",
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
                basic: "check",
                check: "problems",
                problems: "conclusion",
                conclusion: "conclusion",
              }[activeTab] as string

              if (nextTab === "conclusion" && activeTab === "conclusion") {
                handleSubmitReport()
              } else {
                setActiveTab(nextTab)
              }
            }}
          >
            {activeTab === "conclusion" ? "提交报告" : "下一步"}
          </Button>
        </div>
      </div>
    </div>
  )
}
