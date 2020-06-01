import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqDropMenuTreeNode {
    /**
     * 拖动节点
     */
    dragNode: INode
    /**
     * 放置节点
     */
    dropNode: INode
    /**
     * 类型
     */
    dropNodePosition: number
}

export interface INode {
    /**
     * id
     */
    id: string
    /**
     * 父id
     */
    parentId: string
    /**
     * 同级上id
     */
    preId: string
}

export interface IResDropMenuTreeNode extends IUrlError {

}

/**
 * 拖动节点
 * @param model
 * @param callback
 * @constructor
 */
export function EditDropMenuTreeNode(model: IReqDropMenuTreeNode, callback: (e: IResDropMenuTreeNode) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/menutree/drop.do'), model))
}
