import {request} from "../utils/request";

export interface LoginParam {
    username: string
    password: string
}

export interface SettingDto {
    email: string;
    push: boolean;
    time: string;
}

export interface Member {
    id: number
    push: boolean
    time: string
    email: string
}

export class MemberApi {
    static async login(data: LoginParam) {
        return await request<{ access_token: string }, LoginParam>({
            method: 'POST',
            url: '/api/member/login',
            data
        })
    }

    static async setting(data: SettingDto) {
        return await request<Number>({
            method: 'POST',
            url: '/api/member/setting',
            data
        })
    }

    static async getSetting() {
        return await request<Member>({
            url: '/api/member/getSetting',
        })
    }
}
