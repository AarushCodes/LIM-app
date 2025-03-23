"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface StoryModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export function StoryModal({ isOpen, onClose, title, content }: StoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-pink-600">{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-pink-50 p-4 rounded-lg">
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

