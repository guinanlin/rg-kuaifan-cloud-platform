import type React from "react"
import { cn } from "@/lib/utils"

interface AppContainerProps {
  children: React.ReactNode
  className?: string
}

export function AppContainer({ children, className }: AppContainerProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div
        className={cn(
          "relative w-full max-w-sm h-[667px] bg-white rounded-[40px] overflow-hidden shadow-xl",
          className,
        )}
      >
        {/* iPhone 刘海 */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex justify-center">
          <div className="w-40 h-6 bg-black rounded-b-2xl"></div>
        </div>

        {/* 状态栏 */}
        <div className="pt-7 pb-1 px-5 bg-white flex justify-between items-center text-xs">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 14.5A2.5 2.5 0 0111 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 1.38 1.12 2.5 2.5 2.5z" />
              <path d="M12 4c4.97 0 9 3.58 9 8s-4.03 8-9 8c-1.45 0-2.84-.33-4.06-.92-.6.01-1.8.88-4.94 1.92 0 0 1.55-3.89 1.57-3.93C3.62 15.5 3 13.82 3 12c0-4.42 4.03-8 9-8z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M17 5.5v13h-10v-13h10zm1.5-2h-13v17h13v-17z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M11 4h2v1.5h-2z" />
            </svg>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="h-[calc(100%-40px)] overflow-y-auto">{children}</div>

        {/* iPhone 底部指示条 */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center z-10">
          <div className="w-32 h-1 bg-black rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  )
}
