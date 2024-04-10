import { Client, Account, ID } from "appwrite";
import conf from "../config/config";

export class AuthService {
  clint = new Client();
  account;

  constructor() {
    this.clint.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.account = new Account(this.clint);
  }

  async SignUp({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method to login the user
        return this.LogIn({ email, password });
      } else {
        return userAccount;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async LogIn({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (err) {
      console.error(err);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  async LogOut() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.error(err);
    }
  }
}

const authService = new AuthService();

export default authService;
