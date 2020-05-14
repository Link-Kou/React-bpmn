import * as React from 'react';
import {Alert, Button, Modal} from 'rsuite';
import './index.scss'
import HookSortLists from './compose/_HookSortLists';
import {LoadPanel} from '@component/panel';

interface IProps {
    id?: string

    show?: boolean

    type?: 'All' | 'Other'

    alone?: 'title' | 'group' | 'item'

    onSave?(data?: Array<{
        id: string
        title: string
        preId: string
    }>, type?: 'All' | 'Other', alone?: 'title' | 'group' | 'item', callbackCloseLoading?: () => void): void

    onClose?(): void

    onLoad?(id?: string, type?: 'All' | 'Other', alone?: 'title' | 'group' | 'item', callback?: (v: Array<{
        id: string
        title: string
        preId: string
    }>) => void): void
}

interface IState {
    loading: boolean
    data?: Array<{
        id: string
        title: string
        preId: string
    }>
}

export default class TypeConfigEditModel extends React.Component<IProps, IState> {

    public state: IState = {
        loading: false,
        data: undefined
    }

    private _onClose = () => {
        const {loading} = this.state
        const {onClose} = this.props
        if (!loading) {
            onClose?.()
            setTimeout(() => {
                this.setState({
                    data: undefined
                })
            }, 500)
        }
    }

    private _onLoad = () => {
        const {onLoad, id, type, alone} = this.props
        const callback = (data: Array<{
            id: string
            title: string
            preId: string
        }>) => {
            if (data?.length > 0) {
                this._onChange(data)
            } else {
                Alert.warning('无排序元素');
                this._onClose()
            }
        }
        onLoad?.(id, type, alone, callback);
    }

    private _onChange = (data: Array<{
        id: string
        title: string
        preId: string
    }>) => {
        this.setState({
            data
        })
    }

    private _onSave = () => {
        const {onSave, type, alone} = this.props
        this.setState({
            loading: true
        }, () => {
            const callbackCloseLoading = (): void => {
                this.setState({
                    loading: false
                }, () => {
                    this._onClose()
                })
            }
            onSave?.(this.state.data, type, alone, callbackCloseLoading);
        })

    }


    public render() {
        const {show} = this.props
        const {loading, data} = this.state
        return (
            <Modal show={show}
                   size={'xs'}
                   backdrop={'static'}
                   onShow={this._onLoad}
                   onHide={this._onClose}>
                <Modal.Header>
                    <Modal.Title>管理分类</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoadPanel hideLoader={data ? data?.length > 0 : false}
                               hideLoaderComponent={!(data === undefined)}
                               title={data?.length === 0 ? '暂无数据' : '数据加载中...'}
                               outrender={true}
                               height={350}>
                        <HookSortLists data={data} onChange={this._onChange}/>
                    </LoadPanel>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" loading={loading} onClick={this._onSave}>
                        保存
                    </Button>
                    <Button appearance="subtle" onClick={this._onClose}>
                        取消
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

