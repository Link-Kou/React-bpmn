import {IPageReqData, IPageResData, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IPaperProductTypes} from '@fetch/api/paper/index.types';

export interface IReqLoadPaperProductExpression extends IPageResData {
    data: Array<{
        id: string
        type: string
        link: string
        children: Array<any>
        extend: {
            field: string
            symbol: string
            value: string
        }
    }>

}

export interface IResLoadPaperProductExpression extends IPageReqData {
    data: {
        total: number
        list: Array<IPaperProductTypes & {
            /**
             * 编号
             */
            id: string
        }>
    }
}

/**
 * 获取原纸产品
 * @param model
 * @param callback
 * @constructor
 */
export function LoadPaperProductExpression(model: IReqLoadPaperProductExpression, callback: (e: IResLoadPaperProductExpression) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/product/list/expression.do'), model))
}
