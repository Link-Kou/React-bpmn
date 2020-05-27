import * as React from 'react';
import {Alert, Button, Modal} from 'rsuite';
import './index.scss'
import HookSortLists from './compose/hookSortLists';
import {LoadPanel} from '@component/panel';
import {utilsArray} from "@utils/index";

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
    buttonLoading: boolean
    data?: Array<{
        id: string
        title: string
        preId: string
    }>
}

export default class TypeConfigEditModel extends React.Component<IProps, IState> {

    public state: IState = {
        loading: true,
        buttonLoading: false,
        data: undefined
    }

    private _onClose = () => {
        const {buttonLoading} = this.state
        const {onClose} = this.props
        if (!buttonLoading) {
            onClose?.()
            setTimeout(() => {
                this.setState({
                    data: undefined,
                    loading: true
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
            data,
            loading: false
        })
    }

    private _onSave = () => {
        const {onSave, type, alone} = this.props
        this.setState({
            buttonLoading: true
        }, () => {
            const callbackCloseLoading = (): void => {
                this.setState({
                    buttonLoading: false
                }, () => {
                    this._onClose()
                })
            }
            onSave?.(this.state.data, type, alone, callbackCloseLoading);
        })

    }


    public render() {
        const {show} = this.props
        const {loading, data, buttonLoading} = this.state
        const arrayLength = utilsArray.getArrayLength(data);
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
                    <LoadPanel loadering={loading}
                               onLoader={(l, v) => {
                                   if (!l) {
                                       if (arrayLength <= 0) {
                                           return {
                                               title: '暂无数据....',
                                               hide: true,
                                               hideLoaderIcons: true
                                           }
                                       }
                                   }
                                   return v
                               }}
                               outrender={true}
                               height={350}>
                        <HookSortLists data={data} onChange={this._onChange}/>
                    </LoadPanel>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" loading={buttonLoading} onClick={this._onSave}>
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

