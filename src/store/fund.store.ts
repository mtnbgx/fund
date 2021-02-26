import {action, observable} from "mobx";
import {Fund, FundApi} from "@/api/fund.api";

export class FundStore {
  @observable
  list: Fund[] = []

  @action
  async search(key: string): Promise<number> {
    let res = await FundApi.search(key)
    if (res.success) {
      if (res.data.length > 0) {
        this.list = res.data
        return res.data.length
      }
    }
    return 0
  }
}

export const fundStore = new FundStore()
