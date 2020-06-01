import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IReturnTreeData} from './index.types';


export interface IResLoadMenuTreeNodeList extends IUrlError {
    data: Array<IReturnTreeData>
}


/**
 * 加载菜单
 * @param model
 * @param callback
 * @constructor
 */
export function LoadMenuTreeNodeList(callback: (e: IResLoadMenuTreeNodeList) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/menutree/list.do'), {}))
}
