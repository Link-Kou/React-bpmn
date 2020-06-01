import {IReturnTreeData as ReturnTreeData} from '@fetch/api/permissions/index.types';

export interface ITreeData {
    label: string
    value: string
    /**
     * 父节点
     */
    parentId: string
    /**
     * 同级上级节点
     */
    preId: string
    /**
     * 类型
     */
    type: string
    /**
     * 开发权限id
     */
    keyId: string
    children?: Array<any>
}

export interface IDropTreeData {
    /**
     * 拖动节点
     */
    dragNode: ITreeData
    /**
     * 放置节点
     */
    dropNode: ITreeData
    /**
     * 类型
     */
    dropNodePosition: number
}

export interface IReturnTreeData extends ReturnTreeData {

}
