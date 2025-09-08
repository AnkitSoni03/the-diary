"use client";
import React, { FormEvent, startTransition, useActionState, useState } from "react";
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
import { Articles } from "@prisma/client";
import Image from "next/image";
import { updateArticles } from "@/actions/update-article";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditPropsPage = {
  article: Articles;
};

function EditArticlePage({ article }: EditPropsPage) {
  const [content, setContent] = useState(article.content);
  const [formState, action, isPending] = useActionState(
    updateArticles.bind(null, article.id),
    { errors: {} }
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    console.log("🔹 Submitting Form with data:", Object.fromEntries(formData.entries()));

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-yellow-500">✍️ Edit Article</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update the details below and publish changes.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <form onSubmit={handleSubmit} id="article-form" className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                defaultValue={article.title}
                placeholder="Enter article title"
              />
              {formState.errors.title && (
                <span className="text-red-600 text-sm">{formState.errors.title}</span>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue={article.category}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
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
                <option value="other">Other</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-600 text-sm">{formState.errors.category}</span>
              )}
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              {article.featuredImage && (
                <div className="mb-4">
                  <Image
                    src={article.featuredImage}
                    alt="Current featured"
                    width={192}
                    height={128}
                    className="object-cover rounded-md"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Current featured image
                  </p>
                </div>
              )}
              <Input id="featuredImage" name="featuredImage" type="file" accept="image/*" />
              {formState.errors.featuredImage && (
                <span className="text-red-600 text-sm">{formState.errors.featuredImage}</span>
              )}
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label>Content</Label>
              <div className="border rounded-md overflow-hidden">
                <ReactQuill theme="snow" value={content} onChange={setContent} />
              </div>
              {formState.errors.content && (
                <span className="text-red-600 text-sm">{formState.errors.content}</span>
              )}
            </div>

            {/* Form Errors */}
            {formState.errors.formErrors && (
              <div className="text-red-600 text-sm">{formState.errors.formErrors}</div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" form="article-form" disabled={isPending}>
            {isPending ? "Loading..." : "Edit Article"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default EditArticlePage;
