import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IResLoadPaperConfigList extends IUrlError {
    data: Array<IResLoadPaperConfigListData>
}

export interface IResLoadPaperConfigListData {
    id: number
    children: Array<{
        id: string
        title: string
    }>
}

/**
 * 加载原纸配置列表
 * @param callback
 * @constructor
 */
export function LoadPaperConfigList(callback: (e: IResLoadPaperConfigList) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/config/list/all.do'), {}))
}
