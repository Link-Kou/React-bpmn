import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqTypeConfigItem {

    parentId: string

    name: string
    /**
     * 1:所有
     * 2:其他
     */
    type: 'All' | 'Other'
}


export interface IResTypeConfigItem extends IUrlError {

}

/**
 * 添加头部
 * @param model
 * @param callback
 * @constructor
 */
export function AddTypeConfigItem(model: IReqTypeConfigItem, callback: (e: IResTypeConfigItem) => void) {
    const newModel = {
        ...model,
        type: ['', 'All', 'Other'].indexOf(model.type)
    }
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/item/add.do'), newModel))
}
