import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IResTypeConfigAllTitleList extends IUrlError {
    data: TypeConfiggAllTitleChildren
}

interface TypeConfiggAllTitleChildren {
    id: string,
    title: string
    children: Array<TypeConfiggAllTitleChildren>
}

/**
 * 添加头部
 * @param model
 * @param callback
 * @constructor
 */
export function LoadTypeConfigAllTitleList(callback: (e: IResTypeConfigAllTitleList) => void) {
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/title/All/list.do'), {}))
}
