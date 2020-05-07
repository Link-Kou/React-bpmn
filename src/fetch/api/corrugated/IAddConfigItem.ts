import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqAddConfigItem {
    name: string
    //1=Supplier=供应商;2=Corrugared=原纸类型
    type: string | number
}

export interface IResAddConfigItem extends IUrlError {

}

/**
 * 添加楞型配置列表
 * @param model
 * @param callback
 * @constructor
 */
export function AddConfigItem(model: IReqAddConfigItem, callback: (e: IResAddConfigItem) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/config/add.do'), model))
}
