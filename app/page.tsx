import { HomeIcon, UserIcon } from "lucide-react"
import { CategorySection } from "@/components/category-section"
import { AppContainer } from "@/components/app-container"

export default function Home() {
  return (
    <AppContainer>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <CategorySection
              title="物料档案"
              items={[
                { icon: "👔", label: "款式库", color: "bg-blue-100", href: "/material/styles" },
                { icon: "🧵", label: "面料库", color: "bg-orange-100", href: "#" },
                { icon: "🧶", label: "辅料库", color: "bg-blue-100", href: "#" },
                { icon: "👕", label: "成品库", color: "bg-green-100", href: "#" },
                { icon: "🎨", label: "颜色", color: "bg-purple-100", href: "/material/colors" },
                { icon: "📏", label: "尺码", color: "bg-yellow-100", href: "/material/sizes" },
              ]}
              columns={3}
            />

            <CategorySection
              title="样衣管理"
              highlight={true}
              items={[
                { icon: "👕", label: "样衣入库", color: "bg-blue-100", href: "#" },
                { icon: "👔", label: "样衣借样", color: "bg-blue-100", href: "#" },
                { icon: "📤", label: "样衣出库", color: "bg-orange-100", href: "#" },
                { icon: "🔄", label: "样衣库存", color: "bg-blue-100", href: "#" },
                { icon: "📦", label: "样板上架", color: "bg-blue-100", href: "#" },
                { icon: "👚", label: "样衣评审", color: "bg-blue-100", href: "#" },
              ]}
              columns={3}
            />

            <CategorySection
              title="订单"
              items={[
                { icon: "📝", label: "销售订单", color: "bg-blue-100", href: "/orders/sales" },
                { icon: "📋", label: "生产订单", color: "bg-orange-100", href: "/orders/production" },
                { icon: "📤", label: "外协上报", color: "bg-blue-100", href: "/outsource/report" },
                { icon: "📊", label: "订单进度表", color: "bg-blue-100", href: "/orders/progress" },
              ]}
              columns={3}
            />

            <CategorySection
              title="质检"
              items={[
                { icon: "💻", label: "线上质检", color: "bg-teal-100", href: "#" },
                { icon: "☁️", label: "QC巡查", color: "bg-blue-100", href: "/qc/patrol" },
                { icon: "✂️", label: "后道成品检验", color: "bg-purple-100", href: "/qc/finishing" },
                { icon: "🔍", label: "QC成品检验", color: "bg-purple-100", href: "/qc/inspection" },
                { icon: "👁️", label: "监察", color: "bg-green-100", href: "#" },
                { icon: "📚", label: "返工管理", color: "bg-orange-100", href: "/rework/management" },
              ]}
              columns={3}
            />

            <CategorySection
              title="采购"
              items={[
                { icon: "🛒", label: "采购管理", color: "bg-blue-100", href: "#" },
                { icon: "📦", label: "物料管理", color: "bg-blue-100", href: "#" },
                { icon: "🔍", label: "库存查询", color: "bg-orange-100", href: "#" },
              ]}
              columns={3}
            />
          </div>
        </div>

        <div className="border-t bg-white mt-auto">
          <div className="grid grid-cols-2 h-14">
            <button className="flex flex-col items-center justify-center">
              <HomeIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xs mt-1 text-blue-500">工作台</span>
            </button>
            <button className="flex flex-col items-center justify-center">
              <UserIcon className="h-6 w-6 text-gray-500" />
              <span className="text-xs mt-1">我的</span>
            </button>
          </div>
        </div>
      </div>
    </AppContainer>
  )
}
