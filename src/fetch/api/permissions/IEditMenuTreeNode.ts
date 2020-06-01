import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IMenuTreeNode} from './index.types';

export interface IReqEditMenuTreeNode extends IMenuTreeNode {

}

export interface IResEditMenuTreeNode extends IUrlError {

}

/**
 * 编辑菜单
 * @param model
 * @param callback
 * @constructor
 */
export function EditMenuTreeNode(model: IReqEditMenuTreeNode, callback: (e: IResEditMenuTreeNode) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/menutree/edit.do'), model))
}
