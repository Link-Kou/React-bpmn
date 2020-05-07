import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqTypeConfigTitle {
    id: string
    /**
     * 1:Title
     * 2:Group
     * 2:Item
     */
    type: 'title' | 'group' | 'item'
}


export interface IResTypeConfigTitle extends IUrlError {

}

/**
 * 添加头部
 * @param model
 * @param callback
 * @constructor
 */
export function DelTypeConfigTitle(model: IReqTypeConfigTitle, callback: (e: IResTypeConfigTitle) => void) {
    const newModel = {
        ...model,
        type: ['', 'title', 'group', 'item'].indexOf(model.type)
    }
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/del.do'), newModel))
}
