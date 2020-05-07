import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqLoadPaperConfigItemList {
    //1=供应商;2=纸张等级;3=原纸类型
    paperConfigType: number
}

export interface IResLoadPaperConfigItemList extends IUrlError {
    data: Array<{
        id: string
        title: string
        //1=供应商;2=纸张等级;3=原纸类型
        type: number
    }>
}

/**
 * 加载原纸配置Item列表
 * @param model
 * @param callback
 * @constructor
 */
export function LoadPaperConfigItemList(model: IReqLoadPaperConfigItemList, callback: (e: IResLoadPaperConfigItemList) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/config/list/item.do'), model))
}
