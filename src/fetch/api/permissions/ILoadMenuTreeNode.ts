import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IReturnTreeData} from './index.types';

export interface IReqLoadMenuTreeNode {
    id: string
}

export interface IResLoadMenuTreeNode extends IUrlError {
    data: IReturnTreeData
}

/**
 * 加载菜单
 * @param model
 * @param callback
 * @constructor
 */
export function LoadMenuTreeNode(model: IReqLoadMenuTreeNode, callback: (e: IResLoadMenuTreeNode) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions(`/menutree/get/${model.id}.do`), {}))
}
