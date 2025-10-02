"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface ProfileImageUploadProps {
  size?: "sm" | "md" | "lg"
  showUploadButton?: boolean
}

export function ProfileImageUpload({ size = "md", showUploadButton = true }: ProfileImageUploadProps) {
  const { user, updateProfile } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)
    try {
      // Convert file to base64 for demo purposes
      // In production, you would upload to a cloud storage service
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string
        await updateProfile({ avatar: imageUrl })
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Failed to upload image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        {showUploadButton && (
          <Button
            variant="outline"
            size="sm"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
            onClick={triggerFileInput}
            disabled={isUploading}
          >
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showUploadButton && (
        <Button
          variant="outline"
          size="sm"
          onClick={triggerFileInput}
          disabled={isUploading}
          className="flex items-center gap-2 bg-transparent"
        >
          <Upload className="h-4 w-4" />
          {isUploading ? "Uploading..." : "Change Photo"}
        </Button>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
    </div>
  )
}
