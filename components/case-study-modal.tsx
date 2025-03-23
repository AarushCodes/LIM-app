"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export function CaseStudyModal({ isOpen, onClose, title, content }: CaseStudyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-600">{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

