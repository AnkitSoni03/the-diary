"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createArticleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  category: z.string().min(3, "Category is required."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  featuredImage: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: "Featured image is required.",
    }),
});

type CreateArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const createArticles = async (
  prevState: CreateArticleFormState,
  formData: FormData
): Promise<CreateArticleFormState> => {
  console.log("🔹 Incoming FormData:", Object.fromEntries(formData.entries()));

  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
    featuredImage: formData.get("featuredImage"),
  });

  if (!result.success) {
    console.log("❌ Validation failed:", result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  const { userId } = await auth();
  console.log("👤 Clerk UserId:", userId);

  if (!userId) {
    return { errors: { formErrors: ["You have to login first"] } };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  console.log("👤 Prisma User:", existingUser);

  if (!existingUser) {
    return {
      errors: {
        formErrors: ["User not found. Please register before creating an article."],
      },
    };
  }

  // handle image
  const imageFile = formData.get("featuredImage") as File;
  let imageUrl: string;

  console.log("📷 Uploading Image:", imageFile.name);
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );
      uploadStream.end(buffer);
    });

    imageUrl = uploadResult.secure_url;
    console.log("✅ Image Uploaded:", imageUrl);
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err);
    return { errors: { featuredImage: ["Failed to upload image. Try again."] } };
  }

  try {
    await prisma.articles.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl, // required now
        authorId: existingUser.id,
      },
    });
    console.log("✅ Article Created Successfully");
  } catch (error: unknown) {
    console.error("❌ Prisma Create Error:", error);
    return {
      errors: {
        formErrors: [error instanceof Error ? error.message : "Unknown server error"],
      },
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
