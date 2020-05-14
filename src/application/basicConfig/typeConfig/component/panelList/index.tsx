import * as React from 'react';
import {Dropdown} from 'rsuite';
import './index.scss'
import {TypeConfigAddModel, TypeConfigEditModel} from '../index';
import {LoadPanel, HeadPanel} from '@component/panel';
import _delButton from './compose/_delButton';
import _buildPanelLists from './compose/_panelLists';
import {IConstant, IData} from '../../index.types';

interface IProps {
    id: string

    title: string

    type: IConstant.types

    hideDel?: boolean

    boxStyle?: React.CSSProperties

    subHeight?: number

    valueKey?: string
    labelKey?: string

    onMountLoad?(callbackdata: (data: Array<IData>) => void): void

    onLoad?(callbackdata: (data: Array<IData>) => void): void

    onDel?(label: string, value: string, alone: IConstant.alone, reload: () => void): void

    onAddGroup?(label: string, value: string, type: 'All' | 'Other', callbackClose: () => void, reload: () => void): void

    onAddItem?(label: string, value: string, type: IConstant.types, callbackClose: () => void, reload: () => void): void

    onLoadSortableList(id?: string, type?: 'All' | 'Other', alone?: 'title' | 'group' | 'item', callback?: (v: Array<{
        id: string
        title: string
        preId: string
    }>) => void): void

    /**
     * 保存排序列表
     * @param data
     * @param type
     * @param alone
     * @param callbackCloseLoading
     * @param reload
     */
    onSaveSortableList(data: Array<{
        id: string
        title: string
        preId: string
    }>, type: IConstant.types, alone: IConstant.alone, callbackCloseLoading: () => void, reload: () => void): void

}

interface IState {
    showModel: string
    data: Array<IData>
    loading: boolean
}

/**
 *
 * @author lk
 */
export default class TypeConfigPanelAllList extends React.Component<IProps> {

    public state: IState = {
        showModel: '',
        data: [],
        loading: false
    }

    componentDidMount(): void {
        this._onMountLoad()
    }

    private _onMountLoad = () => {
        const {onMountLoad} = this.props
        this.setState({
            data: [],
            loading: false
        }, () => {
            onMountLoad?.((data) => {
                this.setState({
                    data,
                    loading: true
                })
            });
        })
    }

    private _onLoad = () => {
        const {onLoad} = this.props
        this.setState({
            data: [],
            loading: false
        }, () => {
            onLoad?.((data) => {
                this.setState({
                    data,
                    loading: true
                })
            });
        })
    }

    private _onModel = (eventKey: string = '') => {
        this.setState({
            showModel: eventKey
        })
    }

    private _onAddGroupSave = (name: string, callbackCloseLoading: () => void) => {
        const {id, type, onAddGroup} = this.props
        onAddGroup?.(name, id, type, () => {
            this._onModel()
            setTimeout(() => callbackCloseLoading(), 500)
        }, () => {
            this._onLoad()
        })
    }

    private _onSaveSortableList = (data: Array<{
        id: string
        title: string
        preId: string
    }>, type: IConstant.types, alone: IConstant.alone, callbackCloseLoading: () => void) => {
        const {onSaveSortableList} = this.props
        onSaveSortableList?.(data, type, alone, callbackCloseLoading, () => {
            this._onLoad()
        })
    }

    private _onAddItem = (label: string, value: string, type: IConstant.types, callbackClose: () => void) => {
        const {onAddItem} = this.props
        onAddItem?.(label, value, type, callbackClose, () => {
            this._onLoad()
        })
    }

    private _onDel = (label: string, value: string, alone: IConstant.alone) => {
        const {onDel} = this.props
        onDel?.(label, value, alone, () => {
            this._onLoad()
        })
    }

    public render() {
        const {
            title, id, type, boxStyle, onLoadSortableList, subHeight
        } = this.props
        const {showModel, data, loading} = this.state
        return (
            <>
                <TypeConfigEditModel show={showModel === 'sort'}
                                     id={id}
                                     type={type}
                                     alone={'group'}
                                     onSave={this._onSaveSortableList}
                                     onLoad={onLoadSortableList}
                                     onClose={this._onModel}/>
                <TypeConfigAddModel show={showModel === 'add'}
                                    onClose={this._onModel}
                                    onSave={this._onAddGroupSave}
                />
                <div style={boxStyle}>
                    <HeadPanel title={title}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <Dropdown title={'分类管理'} trigger="click" onSelect={this._onModel}>
                                <Dropdown.Item eventKey={'add'}>新增分类</Dropdown.Item>
                                <Dropdown.Item eventKey={'sort'}>分类排序</Dropdown.Item>
                            </Dropdown>
                            <_delButton {...this.props} onDel={this._onDel}/>
                        </div>
                    </HeadPanel>
                    <LoadPanel hideLoader={data?.length > 0 && loading}
                               hideLoaderComponent={loading}
                               title={(data?.length === 0 || !data) && loading ? '暂无数据' : '数据加载中...'}
                               subHeight={subHeight ? subHeight : 65 + 57}>
                        <_buildPanelLists {...this.props}
                                          data={data}
                                          onDel={this._onDel}
                                          onAddItem={this._onAddItem}
                                          onSaveSortableList={this._onSaveSortableList}/>
                    </LoadPanel>

                </div>
            </>
        )
    }
}



