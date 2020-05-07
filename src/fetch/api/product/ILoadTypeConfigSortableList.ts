import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqTypeConfigSortableList {
    /**
     * id
     */
    parentId?: string

    /**
     * 类型
     */
    type: 'All' | 'Other'

    /**
     * 类型
     */
    alone: 'title' | 'group' | 'item'
}

export interface IResTypeConfigSortableList extends IUrlError {
    data: Array<{
        id: string
        title: string
        preId: string
    }>
}


/**
 * 获取到排序列表
 * @param model
 * @param callback
 * @constructor
 */
export function LoadTypeConfigSortableList(model: IReqTypeConfigSortableList, callback: (e: IResTypeConfigSortableList) => void) {
    const newModel = {
        ...model,
        'type': ['', 'All', 'Other'].indexOf(model.type),
        'alone': ['','title' , 'group' , 'item'].indexOf(model.alone)
    }
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/sortable/list.do'), newModel))
}
