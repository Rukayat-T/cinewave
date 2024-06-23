import { CreateUserDto } from "@/models/onboarding.model";
import HTTPClient from "../http_instance/wrapped_instance";

export default class AuthorizationServices {
  static async CreateUser(data: CreateUserDto) {
    const response = await HTTPClient.post(`/user`, data);
    return response.data;
  }
  static async LoginUser(data: CreateUserDto) {
    const response = await HTTPClient.post(`/user/login`, data);
    return response.data;
  }
}
