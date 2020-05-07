import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqEditConfigItem {
    id: string
    title: string
    type: number
}

export interface IResEditConfigItem extends IUrlError {

}

/**
 * 编辑配置
 * @param model
 * @param callback
 * @constructor
 */
export function EditConfigItem(model: Array<IReqEditConfigItem>, callback: (e: IResEditConfigItem) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/config/rename.do'), model))
}
