import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const CreatePost = () => {
  const [content, setContent] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
  }
  return (

    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-slate-700">
        Create a post
      </h1>


      <form className="flex flex-col gap-4" >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Select
           
          >
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="worldnews">Tech News </SelectItem>
                <SelectItem value="sportsnews">Startups</SelectItem>
                <SelectItem value="localnews">AI & Cybersecurity</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload */}
      <div className="border-dashed border-2 border-gray-300 p-3 mb-4 rounded-md">
        <input type="file" onChange={handleImageChange} className="mb-2 " />
        <button className="bg-gray-800 text-white px-4 py-1 rounded-md">
          Upload Image
        </button>
      </div>

     {/* Rich Text Editor (Simple TextArea) */}
     <textarea
        placeholder="Write something here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-md h-32"
      />
        

      </form>
    </div>
  )
}

export default CreatePost