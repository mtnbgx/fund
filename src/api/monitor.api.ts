import {request} from '../utils/request';
import {Fund} from './fund.api';

interface AddMonitor {
    code: string
    up: string
    down: string
}

export interface Monitor {
    id: number
    up: string
    down: string
    fund: Fund
}

export class MonitorApi {

    static async list() {
        return request<Monitor>({url: '/api/monitor/list'})
    }

    static async addMonitor(data: AddMonitor) {
        return request<number, AddMonitor>({url: '/api/monitor/addMonitor', method: 'POST', data})
    }

    static async delMonitor(id: number) {
        return request<number, { id: number }>({url: '/api/monitor/delMonitor', data: {id}})
    }
}
