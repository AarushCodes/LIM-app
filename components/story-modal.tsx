"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface StoryModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export function StoryModal({ isOpen, onClose, title, content }: StoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Ensure content clips and modal has fixed height structure */}
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0"> {/* Prevent header from shrinking */}
          <DialogTitle className="text-xl text-pink-600">{title}</DialogTitle>
        </DialogHeader>
        {/* Allow ScrollArea to take remaining space and handle overflow */}
        <ScrollArea className="flex-grow mt-4 pr-6"> {/* Added margin-top and padding-right for scrollbar */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

