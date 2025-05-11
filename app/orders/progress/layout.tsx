import type React from "react"
import { AppContainer } from "@/components/app-container"
import { HomeIcon, UserIcon } from "lucide-react"
import Link from "next/link"

export default function OrderProgressLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppContainer>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-hidden">{children}</div>

        <div className="border-t bg-white mt-auto">
          <div className="grid grid-cols-2 h-14">
            <Link href="/" className="flex flex-col items-center justify-center">
              <HomeIcon className="h-6 w-6 text-gray-500" />
              <span className="text-xs mt-1">工作台</span>
            </Link>
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
