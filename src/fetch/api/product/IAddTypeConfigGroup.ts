import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqTypeConfigGroup {

    parentId: string

    name: string
    /**
     * 1:所有
     * 2:其他
     */
    type: 'All' | 'Other'
}


export interface IResTypeConfigGroup extends IUrlError {

}

/**
 * 添加头部
 * @param model
 * @param callback
 * @constructor
 */
export function AddTypeConfigGroup(model: IReqTypeConfigGroup, callback: (e: IResTypeConfigGroup) => void) {
    const newModel = {
        ...model,
        type: ['', 'All', 'Other'].indexOf(model.type)
    }
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/group/add.do'), newModel))
}
