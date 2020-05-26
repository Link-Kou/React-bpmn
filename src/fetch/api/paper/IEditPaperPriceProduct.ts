import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqEditPaperPriceProduct {
    id: string
}

export interface IResEditPaperPriceProduct extends IUrlError {

}

/**
 * 同步原纸价格
 * @param model
 * @param callback
 * @constructor
 */
export function EditPaperPriceProduct(model: IReqEditPaperPriceProduct, callback: (e: IResEditPaperPriceProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper(`/product/update/price/${model.id}.do`), model))
}
