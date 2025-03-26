"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Image as ImageIcon, Upload, X, Camera, Paintbrush, PlusCircle, Trash2 } from "lucide-react"

type PhotoItem = {
  id: string
  caption: string
  source: string
  dateAdded: string
  type: "photo" | "drawing" | "inspiration"
}

type PhotoGalleryProps = {
  habitId: number
  ageGroup: "kids" | "teens" | "adults"
}

export function PhotoGallery({ habitId, ageGroup }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [fileInputValue, setFileInputValue] = useState("")
  const [caption, setCaption] = useState("")
  const [photoType, setPhotoType] = useState<"photo" | "drawing" | "inspiration">("photo")
  const [selectedImage, setSelectedImage] = useState<PhotoItem | null>(null)

  // Color schemes based on age group
  const colorSchemes = {
    kids: {
      primary: "from-pink-500 to-orange-400",
      hover: "hover:from-pink-600 hover:to-orange-500",
      light: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-600",
    },
    teens: {
      primary: "from-blue-500 to-teal-400",
      hover: "hover:from-blue-600 hover:to-teal-500",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
    },
    adults: {
      primary: "from-purple-500 to-indigo-400",
      hover: "hover:from-purple-600 hover:to-indigo-500",
      light: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
    }
  }
  
  const colors = colorSchemes[ageGroup]

  useEffect(() => {
    // Load saved photos
    const savedPhotos = localStorage.getItem(`photo-gallery-${ageGroup}-${habitId}`)
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos))
    }
  }, [habitId, ageGroup])

  const saveToLocalStorage = (updatedPhotos: PhotoItem[]) => {
    localStorage.setItem(`photo-gallery-${ageGroup}-${habitId}`, JSON.stringify(updatedPhotos))
    setPhotos(updatedPhotos)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Use FileReader to convert the image to a data URL
    const reader = new FileReader()
    reader.onload = () => {
      // Store the data URL as the image source
      setFileInputValue(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const addPhotoItem = () => {
    if (!fileInputValue) return

    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      caption,
      source: fileInputValue,
      dateAdded: new Date().toISOString(),
      type: photoType
    }

    const updatedPhotos = [...photos, newPhoto]
    saveToLocalStorage(updatedPhotos)

    // Reset form
    setFileInputValue("")
    setCaption("")
    setPhotoType("photo")
    setShowAddForm(false)
  }

  const deletePhoto = (id: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== id)
    saveToLocalStorage(updatedPhotos)
    if (selectedImage?.id === id) {
      setSelectedImage(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <Card className={colors.border}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          <div className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            My Habit Gallery
          </div>
          <Button
            size="sm"
            className={`bg-gradient-to-r ${colors.primary} ${colors.hover}`}
            onClick={() => setShowAddForm(true)}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showAddForm ? (
          <div className={`${colors.light} p-4 rounded-md mb-4`}>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <h3 className="text-md font-bold">Add New Image</h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={photoType === "photo" ? "default" : "outline"} 
                    onClick={() => setPhotoType("photo")}
                    className={photoType === "photo" ? `bg-gradient-to-r ${colors.primary}` : colors.border}
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Photo
                  </Button>
                  <Button 
                    size="sm" 
                    variant={photoType === "drawing" ? "default" : "outline"} 
                    onClick={() => setPhotoType("drawing")}
                    className={photoType === "drawing" ? `bg-gradient-to-r ${colors.primary}` : colors.border}
                  >
                    <Paintbrush className="h-4 w-4 mr-1" />
                    Drawing
                  </Button>
                  <Button 
                    size="sm" 
                    variant={photoType === "inspiration" ? "default" : "outline"} 
                    onClick={() => setPhotoType("inspiration")}
                    className={photoType === "inspiration" ? `bg-gradient-to-r ${colors.primary}` : colors.border}
                  >
                    <ImageIcon className="h-4 w-4 mr-1" />
                    Inspiration
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Upload Image</label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className={`p-2 ${colors.border}`}
                  />
                </div>
                
                {fileInputValue && (
                  <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={fileInputValue} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Caption</label>
                <Textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Add a caption for your image..."
                  className={colors.border}
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${colors.primary} ${colors.hover}`}
                  onClick={addPhotoItem}
                  disabled={!fileInputValue}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {selectedImage ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedImage(null)}
                  >
                    ← Back to Gallery
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deletePhoto(selectedImage.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
                <div className="w-full rounded-md overflow-hidden bg-gray-100">
                  <img 
                    src={selectedImage.source} 
                    alt={selectedImage.caption} 
                    className="w-full object-contain max-h-[300px]"
                  />
                </div>
                <div className={`${colors.light} p-3 rounded-md`}>
                  <h3 className="font-medium">{selectedImage.caption}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{selectedImage.type}</span>
                    <span>{formatDate(selectedImage.dateAdded)}</span>
                  </div>
                </div>
              </div>
            ) : photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {photos.map(photo => (
                  <div 
                    key={photo.id}
                    className="cursor-pointer group relative"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <div className="h-24 rounded-md overflow-hidden bg-gray-100 border">
                      <img 
                        src={photo.source} 
                        alt={photo.caption} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-white bg-black bg-opacity-50"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No images yet. Add photos, drawings, or inspiration images!</p>
                <Button
                  className={`mt-4 bg-gradient-to-r ${colors.primary} ${colors.hover}`}
                  onClick={() => setShowAddForm(true)}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add First Image
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}