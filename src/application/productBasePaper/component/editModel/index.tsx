import * as React from 'react';
import {Alert, Button, Modal} from 'rsuite';
import './index.scss'
import {LoadPanel} from '@component/panel';
import HookSortLists from './compose/_HookSortLists';
import {utilsArray} from '@utils/index';

interface IProps {
    id?: string

    show?: boolean

    onSave?(data?: Array<{
        id: string
        title: string
    }>, callbackCloseLoading?: () => void): void

    onClose?(): void

    onLoad?(id?: string, callback?: (v: Array<{ id: string, title: string }>) => void): void
}

interface IState {
    buttonLoading: boolean
    panleLoading: boolean
    data?: Array<{
        id: string
        title: string
    }>
}

export default class PaperConfigEditModel extends React.Component<IProps, IState> {

    public state: IState = {
        buttonLoading: false,
        panleLoading: true,
        data: []
    }

    private _onClose = () => {
        const {buttonLoading} = this.state
        const {onClose} = this.props
        if (!buttonLoading) {
            onClose?.()
        }
    }

    /**
     * 加载排序列表
     * {@link handlersLoadPaperConfigItemLis}
     * @private
     */
    private _onLoad = () => {
        const {onLoad, id} = this.props
        const callback = (data: Array<{
            id: string
            title: string
        }>) => {
            if (data?.length > 0) {
                this._onChange(data)
            } else {
                Alert.warning('无排序元素');
                this._onClose()
            }
        }
        this.setState({
            panleLoading: true,
            buttonLoading: false,
            data: []
        }, () => {
            onLoad?.(id, callback);
        })
    }

    private _onChange = (data: Array<{ id: string, title: string }>) => {
        this.setState({
            data,
            panleLoading: false
        })
    }

    private _onSave = () => {
        const {onSave} = this.props
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
            onSave?.(this.state.data, callbackCloseLoading);
        })

    }


    public render() {
        const {show} = this.props
        const {buttonLoading, panleLoading, data} = this.state
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
                    <LoadPanel loadering={panleLoading}
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
                    <Button appearance="primary" disabled={panleLoading} loading={buttonLoading} onClick={this._onSave}>
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

