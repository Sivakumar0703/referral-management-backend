import { Storage } from "@google-cloud/storage";

const googleStorageurl = process.env.GOOGLE_CLOUD_STORAGE_URL;
const keyFileContent = process.env.GOOGLE_CLOUD_KEYFILE;
const keyFile = JSON.parse(keyFileContent);

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: keyFile,
});

const bucket = storage.bucket(process.env.GOOGLE_BUCKET_NAME);

const uploadResumeToCloud = async (file) => {
  try {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    // if error occured during upload
    blobStream.on("error", (err) => {
      console.log("error in file uploading", err);
      throw new Error("failed to upload file. try again");
    });

    // handling the file upload
    await new Promise((resolve, reject) => {
      blobStream.on("finish", resolve);
      blobStream.on("error", reject);
      blobStream.end(file.buffer);
    });
    
    const resumeUrl = `${googleStorageurl}/${bucket.name}/${blob.name}`;
    return resumeUrl;
  } catch (error) {
    console.log("error in file uploading", error);
    throw new Error("error in file uploading");
  }
};

export default uploadResumeToCloud;
