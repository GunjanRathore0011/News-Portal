import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">📝 Create New Post</h2>

      <Card>
        <CardContent className="p-6 space-y-6">

          {/* Title + Category */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input type="text" placeholder="Post Title" className="flex-1" required />
            <Select>
              <SelectTrigger className="sm:w-1/3">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="tech">Tech News</SelectItem>
                  <SelectItem value="startups">Startups</SelectItem>
                  <SelectItem value="ai">AI & Cybersecurity</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input type="file" id="imageUpload" onChange={handleImageChange} hidden />
            <label htmlFor="imageUpload" className="cursor-pointer text-sm text-gray-600">
              {image ? `📸 ${image.name}` : "Click to upload an image"}
            </label>
          </div>

          {/* Content */}
          <Textarea
            placeholder="Write your article here..."
            className="min-h-[200px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black w-full"
            onClick={() => {
              console.log("Post submitted:", { content, image });
            } }
          >
            Publish Post
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}
