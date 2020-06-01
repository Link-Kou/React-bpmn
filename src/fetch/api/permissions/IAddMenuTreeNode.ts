import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IMenuTreeNode, IAddMenuTreeNode} from './index.types';

export interface IReqAddMenuTreeNode extends IMenuTreeNode, IAddMenuTreeNode {

}

export interface IResAddMenuTreeNode extends IUrlError {

}

/**
 * 添加菜单
 * @param model
 * @param callback
 * @constructor
 */
export function AddMenuTreeNode(model: IReqAddMenuTreeNode, callback: (e: IResAddMenuTreeNode) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/menutree/add.do'), model))
}
