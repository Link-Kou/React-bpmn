import * as React from 'react';
import {Icon, IconButton, Panel} from 'rsuite';
import {BackColorPanel, HeadPanel, LoadPanel} from '@component/panel';
import RoleManageAddEditModel from '../addEditModel'
import {IReturnRole} from '../../index.types';
import {HookList} from './compone/hookList';

interface IProps {

    onEdit?(id: string, name: string, callbackCloseLoading: () => void): void

    onAdd?(name: string, callbackCloseLoading: () => void): void

    onPermit?(id: string): void

    onDisable?(id: string, name: string,type: 'Disable' | 'Start'): void

    onDelete?(id: string, name: string): void

    edit?: boolean

    loadering: boolean

    data: Array<IReturnRole>
}

/**
 *
 * @author lk
 * @date 2020/5/27 18:40
 * @version 1.0
 */
export default class RoleList extends React.Component<IProps> {

    public state = {
        model: false,
        modelKey: '',
        id: '',
        name: '',
        loadering: true,
        data: []

    }

    private _onClose = () => {
        const {model} = this.state
        this.setState({
            model: !model
        })
    }

    /**
     * 编辑保存
     * @private
     */
    private _onSave = (name: string, callbackCloseLoading: () => void) => {
        const {id} = this.state
        const {onAdd, onEdit} = this.props
        if (id) {
            onEdit?.(id, name, () => {
                this.setState({
                    model: false
                }, () => callbackCloseLoading?.())
            })
        } else {
            onAdd?.(name, () => {
                this.setState({
                    model: false
                }, () => callbackCloseLoading?.())
            })
        }
    }

    /**
     * 添加角色
     * @private
     */
    private _onAdd = () => {
        const {model} = this.state
        this.setState({
            model: !model,
            modelKey: 'Add',
            id: '',
            name: ''
        })
    }

    /**
     * 编辑角色
     * @private
     */
    private _onEdit = (id: string, name: string) => {
        const {model} = this.state
        this.setState({
            model: !model,
            modelKey: 'Edit',
            id,
            name
        })
    }


    public render() {
        const {edit, onPermit, onDisable, onDelete, data, loadering} = this.props
        const {model, modelKey, name} = this.state
        return (
            <>
                <RoleManageAddEditModel key={modelKey} show={model} value={name} onClose={this._onClose}
                                        onSave={this._onSave}/>
                <BackColorPanel>
                    <HeadPanel hideBorderBottom={true} title={'角色管理'}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <IconButton appearance={'subtle'}
                                        onClick={this._onAdd}
                                        icon={<Icon icon={'user-plus'}/>}>新建角色</IconButton>
                        </div>
                    </HeadPanel>
                    <LoadPanel loadering={loadering}
                               outrender={false}
                               queueAnim={true}
                               onLoader={(l, v) => {
                                   if (!l) {
                                       if (data.length <= 0) {
                                           return {
                                               title: '暂无数据....',
                                               hide: true,
                                               hideLoaderIcons: true
                                           }
                                       }
                                   }
                                   return v
                               }}
                    >
                        <Panel>
                            <HookList data={data} edit={edit} onEdit={this._onEdit}
                                      onPermit={onPermit}
                                      onDisable={onDisable}
                                      onDelete={onDelete}/>
                        </Panel>
                    </LoadPanel>
                </BackColorPanel>
            </>
        )
    }
}
