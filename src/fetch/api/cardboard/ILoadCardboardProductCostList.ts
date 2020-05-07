import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {ICardboardProductCost} from './index.types';

export interface IResLoadCardboardProductCostList extends IUrlError {
    data: Array<ICardboardProductCost>
}

/**
 * 纸板产品
 * @param model
 * @param callback
 * @constructor
 */
export function LoadCardboardProductCostList(callback: (e: IResLoadCardboardProductCostList) => void) {
    PromiseFetch(callback, Fetch(Url.getCardboard(`/product/list/cost.do`), {}))
}
