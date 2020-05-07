import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IPaperProductTypes} from '@fetch/api/paper/index.types';


export interface IResLoadPaperProductTrees extends IUrlError {
    data: Array<{
        paperName: string
        supplier: string
        children: IPaperProductTypes
    }>
}

/**
 * 获取获取原纸产品列表
 * @param model
 * @param callback
 * @constructor
 */
export function LoadPaperProductList(callback: (e: IResLoadPaperProductTrees) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/product/list/all.do'), {}))
}
