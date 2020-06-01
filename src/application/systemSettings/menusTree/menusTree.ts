import * as React from 'react';
import {Alert} from 'rsuite';
import {IDropTreeData, IReturnTreeData, ITreeData} from './index.types';
import {ApiPermissions} from '@fetch/api';

export interface IState {
    show: boolean
    title: string
    id: string
    loading: boolean
    treeData: Array<ITreeData>
    activeNode: {
        value?: string
        parentId?: any
        preId?: any
        type?: string
        keyId?: string
    }
}


export default class MenusTree extends React.Component<any, IState> {


    protected handlersMenusTreesNodeAdd = async (treeData: ITreeData, callback: () => void) => {
        ApiPermissions.AddMenuTreeNode({
            title: treeData.label,
            id: treeData.value,
            type: treeData.type,
            keyId: treeData.keyId,
            parentId: treeData.parentId,
            preId: treeData.preId
        }, (req) => {
            if (req.success) {
                callback?.()
            } else {
                Alert.warning(req.msg)
            }
        })
    }


    protected handlersMenusTreesNodeList = async (callback: (node: Array<IReturnTreeData>) => void) => {
        ApiPermissions.LoadMenuTreeNodeList((req) => {
            if (req.success) {
                callback?.(req.data);
            } else {
                Alert.warning(req.msg)
            }
        })
    }


    protected handlersEditMenusTreesNode = async (treeData: { label: string, value: string, type: string, keyId: string }, callback: () => void) => {
        ApiPermissions.EditMenuTreeNode({
            title: treeData.label,
            id: treeData.value,
            type: treeData.type,
            keyId: treeData.keyId
        }, (req) => {
            if (req.success) {
                callback?.();
            } else {
                Alert.warning(req.msg)
            }
        })
    }


    protected handlersMenusTreesNode = async (id: any, callback: (node: IReturnTreeData) => void) => {
        ApiPermissions.LoadMenuTreeNode({id}, (req) => {
            if (req.success) {
                callback?.(req.data);
            } else {
                Alert.warning(req.msg)
            }
        })
    }

    protected handlersDeleteMenusTreesNode = async (id: any, callback: (req: any) => void) => {
        ApiPermissions.DeleteMenuTreeNode({id}, (req) => {
            callback?.(req);
        })
    }

    protected handlersMenusDoropTreesNode = async (treeData: IDropTreeData, callback: () => void) => {
        const {dragNode, dropNode} = treeData
        ApiPermissions.EditDropMenuTreeNode({
            dragNode: {
                id: dragNode.value,
                parentId: dragNode.parentId,
                preId: dragNode.preId
            },
            dropNode: {
                id: dropNode.value,
                parentId: dropNode.parentId,
                preId: dropNode.preId
            },
            dropNodePosition: treeData.dropNodePosition
        }, (req) => {
            if (req.success) {
                callback?.();
            } else {
                Alert.warning(req.msg)
            }
        })
    }
}
