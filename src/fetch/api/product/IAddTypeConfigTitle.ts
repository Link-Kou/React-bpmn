import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqDelTypeConfigTitle {
    name: string
    /**
     * 1:所有
     * 2:其他
     */
    type: 'All' | 'Other'
}


export interface IResDelTypeConfigTitle extends IUrlError {

}

/**
 * 添加头部
 * @param model
 * @param callback
 * @constructor
 */
export function AddTypeConfigTitle(model: IReqDelTypeConfigTitle, callback: (e: IResDelTypeConfigTitle) => void) {
    const newModel = {
        ...model,
        type: ['', 'All', 'Other'].indexOf(model.type)
    }
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/title/add.do'), newModel))
}
