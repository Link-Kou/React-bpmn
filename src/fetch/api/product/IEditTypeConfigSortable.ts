import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IReqTypeConfigSortableEditList {

    data: Array<IData>
    /**
     * 1:All
     * 2:Other
     */
    type: 'All' | 'Other'
    /**
     *  1:'title'
     *  2:'group'
     *  3:'item'
     */
    alone: 'title' | 'group' | 'item'
}


interface IData {
    /**
     * id
     */
    id: string

    /**
     * 类型
     */
    preId: string

    /**
     * 类型
     */
    title: string
}


export interface IResTypeConfigSortableEditList extends IUrlError {
}


/**
 * 保存排序的编辑
 * @param model
 * @param callback
 * @constructor
 */
export function EditTypeConfigSortableEdit(model: IReqTypeConfigSortableEditList, callback: (e: IResTypeConfigSortableEditList) => void) {
    const newModel = {
        ...model,
        'type': ['', 'All', 'Other'].indexOf(model.type),
        'alone': ['', 'title', 'group', 'item'].indexOf(model.alone)
    }
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/sortable/edit.do'), newModel))
}
