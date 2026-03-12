"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Drawer({ isOpen, onClose, title, children, className, side = "right" }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const variants = {
    right: { x: "100%" },
    left: { x: "-100%" },
    end: { x: "100%" }, // Will be handled by logical placement
    start: { x: "-100%" },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-100"
          />
          <motion.div
            initial={variants[side]}
            animate={{ x: 0 }}
            exit={variants[side]}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed top-0 bottom-0 w-full max-w-md bg-background shadow-2xl z-101 flex flex-col",
              side === "right" || side === "end" ? "inset-inline-end-0" : "inset-inline-start-0",
              className
            )}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-medium tracking-widest uppercase">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 -me-2 hover:bg-accent transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
