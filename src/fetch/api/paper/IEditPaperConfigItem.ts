import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqEditPaperConfigItem {
    id: string
    title: string
}


export interface IResEditPaperConfigItem extends IUrlError {

}

/**
 * 保存
 * @param callback
 * @constructor
 */
export function EditPaperConfigItem(model: Array<IReqEditPaperConfigItem>, callback: (e: IResEditPaperConfigItem) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/config/rename.do'), model))
}
