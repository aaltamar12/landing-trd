import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_S3_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
  },
});

export async function POST(request) {
  try {
    console.log("ACA EN POST");
    const formData = await request.formData();
    console.log("ACA NO");
    const files = formData.getAll("file");

    if (!files || files.length === 0) {
      console.log("No files found in the request.");
      return NextResponse.json(
        { message: "No files found in the request." },
        { status: 400 }
      );
    }

    console.log("Files received:", files);

    const uploadPromises = files.map(async (file) => {
      console.log("Processing file:", file);

      if (!file.arrayBuffer) {
        console.error("The file does not have the method arrayBuffer");
        throw new Error("Unsupported file format");
      }

      const Body = await file.arrayBuffer();
      const Key = `uploads/${Date.now().toString()}-${file.name}`;

      const command = new PutObjectCommand({
        Bucket,
        Key,
        Body,
      });
      await s3.send(command);

      return { Key, Location: `https://${Bucket}.s3.amazonaws.com/${Key}` };
    });

    const response = await Promise.all(uploadPromises);

    console.log("Files uploaded:", response);
    return NextResponse.json({
      message: "Files uploaded successfully",
      file: response.map((image) => {
        return image.Location;
      }),
    });
  } catch (error) {
    console.error("Error uploading files: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
