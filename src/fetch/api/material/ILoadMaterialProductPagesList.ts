import {IPageReqData, IPageResData, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IReturnMaterialProduct} from './index.types';

export interface IReqLoadMaterialProductPage extends IPageResData {

}

export interface IResLoadMaterialProductPage extends IPageReqData {
    data: {
        total: number
        list: Array<IReturnMaterialProduct>
    }
}

/**
 * 添加辅料
 * @param model
 * @param callback
 * @constructor
 */
export function LoadMaterialProductPage(model: IReqLoadMaterialProductPage, callback: (e: IResLoadMaterialProductPage) => void) {
    PromiseFetch(callback, Fetch(Url.getMaterial('/product/list/pages.do'), model))
}
