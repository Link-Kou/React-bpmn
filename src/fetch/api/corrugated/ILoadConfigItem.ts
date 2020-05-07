import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqLoadConfigItem {
    //Supplier=供应商;Corrugared=原纸类型
    type: 'Supplier' | 'Corrugared'
}


export interface IResLoadConfigItem extends IUrlError {

}

/**
 * 加载子项
 * @param model
 * @param callback
 * @constructor
 */
export function LoadConfigItem(model: IReqLoadConfigItem, callback: (e: IResLoadConfigItem) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/config/list/item.do'), model))
}
