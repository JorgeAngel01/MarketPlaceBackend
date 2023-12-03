import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const CD_CLOUD_NAME = process.env.NEXT_PUBLIC_CD_CLOUD_NAME;
const CD_API_KEY = process.env.NEXT_PUBLIC_CD_API_KEY;
const CD_API_SECRET = process.env.NEXT_PUBLIC_CD_API_SECRET;

cloudinary.config({
  cloud_name: CD_CLOUD_NAME,
  api_key: CD_API_KEY,
  api_secret: CD_API_SECRET,
});

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");
  if (!image) {
    return NextResponse.json("no se ha subido ninguna imagen", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
      .end(buffer);
  });
  console.log(response);

  return NextResponse.json({
    message: "imagen subida",
    url: response.secure_url,
  });
}
