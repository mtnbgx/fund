import {request} from "../utils/request";

export interface LoginParam {
  username: string
  password: string
}

export class MemberApi {
  static async login(data: LoginParam) {
    let res = await request<{ access_token: string }, LoginParam>({
      method: 'POST',
      url: '/api/member/login',
      data
    })
    return res
  }
}
