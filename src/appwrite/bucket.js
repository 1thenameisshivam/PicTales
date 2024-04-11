import { Client, Storage, Id } from "appwrite";
import conf from "../config/config";

export class BucketService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        Id.unique(),
        file
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  filePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (err) {
      console.error(err);
    }
  }
}

const bucketService = new BucketService();

export default bucketService;
