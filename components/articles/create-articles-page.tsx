"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function CreateArticlePage() {
  const [content, setContent] = useState("");

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <Card className="shadow-lg border rounded-2xl">
        {/* Header */}
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            ✍️ Create New Article
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to publish your article.
          </p>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-6 pt-4">
          <form className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Enter article title"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="">Select Category</option>
                <option value="education">Education</option>
                <option value="sports">Sports</option>
                <option value="health">Health & Wellness</option>
                <option value="medical">Medical</option>
                <option value="career">Career & Goals</option>
                <option value="business">Business</option>
                <option value="finance">Finance</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
                <option value="travel">Travel</option>
                <option value="food">Food & Recipes</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="fashion">Fashion</option>
                <option value="entertainment">Entertainment</option>
                <option value="news">News & Current Affairs</option>
                <option value="history">History & Culture</option>
                <option value="science">Science & Research</option>
                <option value="environment">Environment</option>
                <option value="art">Art & Creativity</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
              />
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label>Content</Label>
              <div className="border rounded-md overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </div>
            </div>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Publish</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateArticlePage;
