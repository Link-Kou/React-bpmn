import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqDeleteMenuTreeNode {
    /**
     * id
     */
    id: string
}

export interface IResDeleteMenuTreeNode extends IUrlError {

}

/**
 * 编辑菜单
 * @param model
 * @param callback
 * @constructor
 */
export function DeleteMenuTreeNode(model: IReqDeleteMenuTreeNode, callback: (e: IResDeleteMenuTreeNode) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions(`/menutree/delete/${model.id}.do`), {}))
}
