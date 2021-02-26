import {request} from "../utils/request";

export interface Fund {
  id: number
  name: string
  code: string
  type: string
}


export class FundApi {
  static listByMemberId() {
    return request<Fund[]>({url: '/api/fund/listByMemberId'})
  }

  static search(key: string) {
    return request<Fund[]>({url: '/api/fund/search', data: {key}})
  }
}
