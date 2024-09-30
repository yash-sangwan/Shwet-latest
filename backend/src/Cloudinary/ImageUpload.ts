import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to generate signed upload data
export const generateSignedUploadData = async (folder: string): Promise<{
  timestamp: number;
  signature: string;
  cloudName: string;
  folder: string;
  key: string;
}> => {
  const currentTime = Math.round(Date.now() / 1000);  // Current time in seconds
  const timestamp = currentTime - (58 * 60); 

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: folder, // Specify the folder here
    },
    process.env.CLOUDINARY_API_SECRET as string
  );

  return {
    timestamp,
    signature,
    folder,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    key: process.env.CLOUDINARY_API_KEY as string
  };
};