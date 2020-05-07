import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqDelConfigItem {
    id: string
}


export interface IResDelConfigItem extends IUrlError {

}

/**
 * 删除配置
 * @param model
 * @param callback
 * @constructor
 */
export function DelConfigItem(model: IReqDelConfigItem, callback: (e: IResDelConfigItem) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/config/del.do'), model))
}
