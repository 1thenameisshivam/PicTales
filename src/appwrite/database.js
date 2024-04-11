import { Client, Databases, Query } from "appwrite";
import conf from "../config/config";

export class Service {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createData({
    title,
    description,
    featuredImage,
    userId,
    status,
    slug,
  }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, description, featuredImage, userId, status }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async updateData(slug, { title, description, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          description,
          featuredImage,
          status,
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async DeleteData(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getData(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (err) {
      console.error(err);
    }
  }

  async getAllData(query = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        query
      );
    } catch (err) {
      console.error(err);
    }
  }
}

const service = new Service();

export default service;
