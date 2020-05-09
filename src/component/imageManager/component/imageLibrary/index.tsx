import * as React from 'react';
import {Modal, Nav} from 'rsuite';

import ImageLibraryUploader from './component/imageLibraryUploader'
import ImageLibraryResources from './component/imageLibraryResources'

interface Iprops {
    /**
     * 支持多选会有多个文件返回
     * */
    onSelect?(fileurl: Array<string>, callbackClose: () => void): void

    /**
     * 窗口关闭
     */
    onClone?(): void

    /**
     * 页数选择回调
     * @param itemsPerPage
     * @param page
     * @param callback
     */
    onLoad?(itemsPerPage: number, page: number, callback: (data: Array<any>, total: number) => void): void

    /**
     * 删除
     * @param fileurl
     * @param id
     */
    onDel?(fileurl: string, id?: string): void

    /**
     * 是否显示
     */
    show?: boolean

    /**
     * 最大选择
     */
    maxSize?: number

    /**
     * 文件上传路径
     */
    action: string
    /**
     *
     */
    url: string
}

/**
 * 图片资源库
 */
export default class ImageLibrary extends React.Component<Iprops> {

    public state = {
        navActiveKey: 'library',
        files: [],
        total: 0,
        page: 1,
        itemsPerPage: 10
    };

    public _close = (e?: any) => {
        e?.stopPropagation();
        this.setState({
            navActiveKey: 'library',
            files: [],
            total: 0,
            page: 1,
            itemsPerPage: 10
        }, () => {
            const {onClone} = this.props
            onClone?.();
        })
    }

    /**
     * 显示
     * @private
     */
    private _onShow = () => {
        const {onLoad} = this.props
        const {page, itemsPerPage} = this.state
        onLoad?.(itemsPerPage, page, (data, total) => {
            this.setState({
                files: data,
                total: total
            })
        })
    }

    /**
     * 改变每页数量
     * @param size
     * @private
     */
    private _onChangeLength = (size: number) => {
        const {onLoad} = this.props
        const {page} = this.state
        this.setState({
            itemsPerPage: size
        }, () => {
            onLoad?.(size, page, (data, total) => {
                this.setState({
                    files: data,
                    total: total
                })
            })
        })
    }

    /**
     * 改变页数
     * @param page
     * @private
     */
    private _onChangePage = (page: number) => {
        const {onLoad} = this.props
        const {itemsPerPage} = this.state
        this.setState({
            page: page
        }, () => {
            onLoad?.(itemsPerPage, page, (data, total) => {
                this.setState({
                    files: data,
                    total: total
                })
            })
        })
    }


    /**
     * 选择
     * @private
     */
    private _onSelect = (fileurl: Array<string>) => {
        const {onSelect} = this.props
        onSelect?.(fileurl, () => {
            this._close()
        })
    }

    public render() {
        const {navActiveKey, files, total, page, itemsPerPage} = this.state
        const {maxSize, action, onDel, show, url} = this.props
        return (
            <Modal full={false} size={'md'}
                   show={show}
                   onShow={this._onShow}
                   onHide={this._close}
            >
                <Modal.Header>
                    <Modal.Title onClick={(event: any) => {
                        event?.stopPropagation()
                    }}>
                        <Nav appearance={'subtle'} activeKey={navActiveKey} onSelect={(ek, event) => {
                            event?.stopPropagation()
                            this.setState({
                                navActiveKey: ek
                            })
                        }}>
                            <Nav.Item eventKey="library">素材库</Nav.Item>
                            <Nav.Item eventKey="uploader">上传图片</Nav.Item>
                        </Nav>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body onClick={(event: any) => {
                    event?.stopPropagation()
                }} style={{marginTop: 0, paddingTop: 30}}>
                    <div style={{display: navActiveKey === 'uploader' ? 'block' : 'none'}}>
                        <ImageLibraryUploader action={action}/>
                    </div>
                    <div style={{display: navActiveKey === 'library' ? 'block' : 'none'}}>
                        <ImageLibraryResources maxSize={maxSize}
                                               url={url}
                                               total={total}
                                               activePage={page}
                                               displayLength={itemsPerPage}
                                               onChangeLength={this._onChangeLength}
                                               onChangePage={this._onChangePage}
                                               onDel={onDel}
                                               files={files}
                                               onSelect={this._onSelect}/>
                    </div>
                </Modal.Body>
                <Modal.Footer/>
            </Modal>
        );
    }

}
