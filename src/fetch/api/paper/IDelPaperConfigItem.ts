import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqDelPaperConfigItem {
    id: string
}


export interface IResDelPaperConfigItem extends IUrlError {

}

/**
 * 删除原纸配置列表
 * @param callback
 * @constructor
 */
export function DelPaperConfigItem(model: IReqDelPaperConfigItem, callback: (e: IResDelPaperConfigItem) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/config/del.do'), model))
}
