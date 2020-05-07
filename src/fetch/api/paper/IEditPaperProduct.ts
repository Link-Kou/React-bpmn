import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IPaperProductTypes} from '@fetch/api/paper/index.types';

export interface IReqEditPaperProduct extends IPaperProductTypes {
    id: string
}

export interface IResEditPaperProduct extends IUrlError {

}

/**
 * 编辑原纸产品
 * @param model
 * @param callback
 * @constructor
 */
export function EditPaperProduct(model: IReqEditPaperProduct, callback: (e: IResEditPaperProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/product/edit/update.do'), model))
}
