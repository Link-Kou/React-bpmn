import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IResLoadConfigAll extends IUrlError {
    data: {
        id: string
        children: Array<{
            id: string
            title: string
        }>
    }
}

/**
 * 加载所有配置
 * @param model
 * @param callback
 * @constructor
 */
export function LoadConfigAll(callback: (e: IResLoadConfigAll) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/config/list/all.do'), {}))
}
