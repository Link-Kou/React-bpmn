import * as React from 'react';
import {Dropdown} from 'rsuite';
import {TypeConfigAddModel, TypeConfigEditModel, TypeConfigPanelList} from '../index';
import {LoadPanel, HeadPanel} from '@component/panel';
import {utilsNumber, utilsObject} from '@utils/index';
import QueueAnim from 'rc-queue-anim';
import {IConstant, IData} from '../../index.types';

//region
export interface IProps {
    valueKey?: string
    labelKey?: string

    /**
     * 初始化加载
     * @param callbackdata
     */
    onLoad?(callbackdata: (data: Array<IData>) => void): void

    /**
     * 加载排序列表
     * @param id
     * @param type
     * @param alone
     * @param callback
     */
    onLoadSortableList(id?: string, type?: 'All' | 'Other', alone?: 'title' | 'group' | 'item', callback?: (v: Array<{
        id: string
        title: string
        preId: string
    }>) => void): void

    /**
     * 保存排序
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

    /**
     * 添加title
     * @param name
     * @param type
     * @param callbackClose
     */
    onAddOtherTitle(name: string, callbackClose: () => void, reload: () => void): void

    /**
     * 添加Group
     * @param parentId
     * @param name
     * @param type
     * @param callbackClose
     * @param reload
     */
    onAddOtherGroup(parentId: string, name: string, type: 'All' | 'Other', callbackClose: () => void, reload: () => void): void

    /**
     * 添加Item
     * @param parentId
     * @param name
     * @param type
     * @param callbackClose
     * @param reload
     */
    onAddOtherItem(name: string, parentId: string, type: 'All' | 'Other', callbackClose: () => void, reload: () => void): void

    /**
     * 删除title
     * @param label
     * @param value
     * @param alone 常量：2
     * @param reload
     */
    onDelOtherTitle(label: string, value: string, alone: IConstant.alone, reload: () => void): void
}


//endregion


interface IState {
    showModel: string
    data: Array<IData>
    loading: boolean
}

export default class TypeConfigPanelItemGroupList extends React.Component<IProps> {

    public state: IState = {
        showModel: '',
        data: [],
        loading: false
    }

    public componentDidMount(): void {
        this._onLoad()
    }

    private _onModel = (eventKey: string = '') => {
        this.setState({
            showModel: eventKey
        })
    }

    private _onSaveTitle = (name: string, callbackCloseLoading: () => void) => {
        const {onAddOtherTitle} = this.props
        onAddOtherTitle?.(name, () => {
            this._onModel()
            setTimeout(() => callbackCloseLoading(), 500)
        }, () => {
            this._onLoad()
        })
    }

    private _onLoad = () => {
        const {onLoad} = this.props
        this.setState({
            loading: false,
            data: []
        }, () => {
            onLoad?.((data) => {
                this.setState({
                    data,
                    loading: true
                })
            })
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

    public render() {
        const {
            onLoadSortableList, onSaveSortableList,
            onAddOtherGroup, onAddOtherItem, onDelOtherTitle, labelKey, valueKey
        } = this.props
        const {showModel, data, loading} = this.state
        return (
            <>
                <TypeConfigEditModel show={showModel === 'sort'}
                                     id={''}
                                     type={'Other'}
                                     alone={'title'}
                                     onSave={this._onSaveSortableList}
                                     onLoad={onLoadSortableList}
                                     onClose={this._onModel}/>
                <TypeConfigAddModel show={showModel === 'add'}
                                    onClose={this._onModel}
                                    onSave={this._onSaveTitle}/>
                <div style={{height: 57, borderBottom: '1px solid #eee'}}>
                    <HeadPanel title={'其他分类'} hideTitle={false} hideBorderBottom={true}>
                        <Dropdown title={'分类管理'} trigger="click" onSelect={this._onModel}>
                            <Dropdown.Item eventKey={'add'}>新增分类</Dropdown.Item>
                            <Dropdown.Item eventKey={'sort'}>分类排序</Dropdown.Item>
                        </Dropdown>
                    </HeadPanel>
                </div>
                <div style={{overflow: 'auto'}}>
                    <LoadPanel hideLoader={loading}
                               hideLoaderComponent={loading}
                               title={loading && data?.length === 0 ? '暂无数据' : '数据加载中...'}
                               subHeight={65 + 57}>
                        <div style={{display: 'flex', width: 350 * utilsNumber.toNumberDefault(data?.length, 0)}}>
                            {
                                data?.map((k, i, a) => {
                                    const {_labelKey, _valueKey} = utilsObject.getLabeValuelKey(this.props, k);
                                    return (
                                        <QueueAnim type={['left', 'right']}
                                                   ease={['easeInOutQuad', 'easeInBack']}>
                                            <div key={i.toString()} style={{width: 350}}>
                                                <TypeConfigPanelList title={_labelKey}
                                                                     type={'Other'}
                                                                     id={_valueKey}
                                                                     labelKey={labelKey}
                                                                     valueKey={valueKey}
                                                                     boxStyle={{borderRight: '1px solid #eee'}}
                                                                     onMountLoad={(callbackdata) => callbackdata(k.children)}
                                                                     onLoad={() => this._onLoad()}
                                                                     onLoadSortableList={onLoadSortableList}
                                                                     onSaveSortableList={onSaveSortableList}
                                                                     onAddGroup={onAddOtherGroup}
                                                                     onAddItem={onAddOtherItem}
                                                                     onDel={onDelOtherTitle}
                                                                     subHeight={65 + 57 + 59}/>
                                            </div>
                                        </QueueAnim>
                                    )
                                })
                            }
                        </div>
                    </LoadPanel>
                </div>
            </>
        )
    }
}

