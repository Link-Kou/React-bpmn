import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IResTypeConfigOtherTitleList extends IUrlError {
    data: Array<TypeConfigOtherTitleChildren>

}

interface TypeConfigOtherTitleChildren {
    id: string,
    title: string
    children: Array<TypeConfigOtherTitleChildren>

    [x: string]: any
}

/**
 * 添加头部
 * @param model
 * @param callback
 * @constructor
 */
export function LoadTypeConfigOtherTitleList(callback: (e: IResTypeConfigOtherTitleList) => void) {
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/title/other/list.do'), {}))
}
