import * as React from 'react';
import classNames from 'classnames'
import {Uploader} from 'rsuite';
import './viewUploader.scss'
import {Loader} from '@component/loadPanel';
import {utilsNumber} from '@utils/index';
import {FileType} from 'rsuite/lib/Uploader';

interface Iprops {

    /**
     * 显示事件
     * @param fileUrl
     */
    onShow?(fileUrl?: string): void

    /**
     * 删除事件
     * @param fileUrl
     * @param callbackDel
     */
    onDelete?(fileUrl?: string, callbackDel?: (del: boolean) => void): void

    /**
     * 上传事件
     */
    onUpdate?(): void

    /**
     * 是否可以上传
     */
    onShouldUpdate?(newFile: FileType[] | FileType): boolean

    /**
     * 文件路径
     */
    fileUrl?: string

    /**
     * 上传路径
     */
    actionUrl?: string

    height?: number

    width?: number

}

/**
 * 图片
 */
export default class ImageCardViewUploaderDelete extends React.Component<Iprops> {

    public _uploader: any

    public state = {
        //文件地址
        fileUrl: undefined,
        fileType: undefined,
        //文件列表
        fileList: [],
        //加载进度 ：default|success|error|loading|uploadLoading
        load: 'default',
        width: utilsNumber.isNumberOption(this.props.width, (v) => v <= 80 ? 80 : v),
        height: utilsNumber.isNumberOption(this.props.height, (v) => v <= 80 ? 80 : v)
    };

    public componentDidMount(): void {
        this._onLoadImage(this.props.fileUrl)
    }

    /**
     * 图片加载显示进度
     * @private
     */
    public _onLoadImage(url: string | undefined) {
        if (url) {
            this.setState({
                load: 'loading'
            }, () => {
                const img = new Image()
                img.src = url
                img.onload = () => {
                    setTimeout(() => {
                        this.setState(() => ({
                            load: 'success',
                            fileUrl: url
                        }))
                    }, 1500)
                }
                img.onerror = () => {
                    setTimeout(() => {
                        this.setState(() => ({
                            load: 'error',
                            fileUrl: undefined
                        }))
                    }, 1500)
                }
            })
        } else {
            this._onDel(true)
        }
    }

    /**
     * 加载图片预览
     * @param file
     * @param callback
     */
    public getPreviewFile(file: File, callback: (result: string | ArrayBuffer | null) => void) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

    /**
     * 删除图片
     * @param del
     * @private
     */
    public _onDel(del: boolean) {
        if (del) {
            this.setState({
                fileUrl: undefined,
                load: 'default'
            })
        }
    }


    public _viewComponent() {
        const {load, fileUrl, fileList, fileType, width, height} = this.state
        const {onShow, onDelete, onUpdate, onShouldUpdate} = this.props

        const widthUpload = utilsNumber.isNumberOption(width, (v) => v - 14)
        const heightUpload = utilsNumber.isNumberOption(height, (v) => v - 14)

        const viewSvgIcons = () => {
            if (load === 'success' && fileUrl !== undefined) {
                return (
                    <div style={{width: widthUpload, height: heightUpload}} className={'app-image-library-icon'}>
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             onClick={() => {
                                 onShow && onShow(fileUrl)
                             }}
                        >
                            <path
                                d="M512 608a96 96 0 1 1 0-192 96 96 0 0 1 0 192m0-256c-88.224 0-160 71.776-160 160s71.776 160 160 160 160-71.776 160-160-71.776-160-160-160"
                                fill="#000000" p-id="540" data-spm-anchor-id="a313x.7781069.0.i1"
                                className="selected"/>
                            <path
                                d="M512 800c-212.064 0-384-256-384-288s171.936-288 384-288 384 256 384 288-171.936 288-384 288m0-640C265.248 160 64 443.008 64 512c0 68.992 201.248 352 448 352s448-283.008 448-352c0-68.992-201.248-352-448-352"
                                fill="#000000" p-id="541"/>
                        </svg>
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             onClick={() => {
                                 if (onDelete) {
                                     onDelete(fileUrl, this._onDel.bind(this))
                                 }
                             }}
                        >
                            <path
                                d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"
                                fill="#231815" p-id="552"/>
                            <path
                                d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"
                                fill="#231815" p-id="553"/>
                        </svg>
                    </div>
                )
            }
            return undefined
        }

        const viewImage = () => {
            if (load === 'success') {
                return (
                    <img alt={''} src={fileUrl}/>
                )
            } else if (load === 'uploadLoading') {
                return (
                    <img alt={''} src={fileType}/>
                )
            }
            return undefined
        }

        const viewState = () => {
            if (load === 'loading' || load === 'uploadLoading') {
                return (
                    <Loader/>
                )
            } else if (load === 'error') {
                return (
                    <Loader classPrefix={'app-handle-img-error'}/>
                )
            }
            return undefined
        }

        const viweUploader = () => {
            const classnames = classNames({
                'app-image-library-icon': true,
                'app-image-uploader-hide': load === 'uploadLoading' || load === 'success'

            })
            return (
                <div style={{width: widthUpload, height: heightUpload}} className={classnames}>
                    <Uploader
                        //style={{display: 'none'}}
                        ref={(ref: any) => {
                            this._uploader = ref
                        }}
                        multiple={false}
                        disabled={false}
                        //fileList={this.state.fileList}
                        listType="picture-text"
                        // /api/upload.php
                        action="/api/upload.php"
                        timeout={5000}
                        //允许更新队列。在选择文件后，更新上传文件队列前的校验函数，返回 false 则不更新
                        shouldQueueUpdate={(fileLists: FileType[], newFile: FileType[] | FileType) => {
                            if (fileLists.length > 1) {
                                return false;
                            }
                            if (onShouldUpdate) {
                                const b = onShouldUpdate(newFile);
                                if (!b) {
                                    return false
                                }
                            }
                            this.setState({
                                fileList: fileLists
                            })
                            return true
                        }}
                        onChange={(fileTypes) => {
                            if (fileTypes.length > 0) {
                                //previewFile()
                                this.getPreviewFile(fileTypes[0].blobFile as File, (e) => {
                                    this.setState({
                                        fileType: e
                                    })
                                })
                            }
                        }}
                        //上传开始
                        onUpload={() => {
                            this.setState({
                                load: 'uploadLoading'
                            })
                        }}
                        //上传成功
                        onSuccess={(response: any, file: any) => {
                            setTimeout(() => {
                                this.setState({
                                    load: 'success',
                                    fileUrl: 'https://www.isofts.org/wp-content/uploads/001-1099.jpg',
                                    fileType: undefined
                                })
                            }, 5500)

                        }}
                        //上传失败
                        onError={() => {
                            this.setState({
                                load: 'error',
                                fileUrl: undefined,
                                fileType: undefined
                            }, () => {
                                if (fileList.length > 0) {
                                    const file: any = fileList[0]
                                    this._uploader.handleRemoveFile(file.fileKey)
                                }
                            })
                        }}
                    >
                        <div>
                            <div className={'app-image-library-icon'}>
                                <svg viewBox="0 0 1024 1024" width="20" height="20"
                                     onClick={(e) => {
                                         onUpdate && onUpdate()
                                     }}>
                                    <path
                                        d="M938.3 530.8l-0.3-4.2c-0.2-2.9-0.4-5.7-0.7-8.6l-0.6-4.8c-0.3-2.6-0.6-5.2-1-7.8-0.2-1.6-0.5-3.2-0.8-4.9-0.4-2.6-0.9-5.1-1.4-7.7-0.3-1.6-0.6-3.1-1-4.7-0.6-2.6-1.2-5.2-1.8-7.7-0.4-1.5-0.7-2.9-1.1-4.3-0.7-2.7-1.5-5.4-2.3-8.1-0.4-1.2-0.8-2.5-1.1-3.7-0.9-2.9-1.9-5.9-3-8.8-0.3-0.9-0.7-1.9-1-2.8-1.3-3.4-2.6-6.8-4-10.2-0.2-0.4-0.3-0.7-0.4-1.1-28.1-66.3-82.8-118.8-151-143.9-0.4-0.1-0.7-0.3-1.1-0.4-3.4-1.2-6.9-2.4-10.4-3.5-0.8-0.2-1.5-0.5-2.3-0.7l-9.3-2.7-3.3-0.9c-2.8-0.7-5.7-1.4-8.5-2l-4.2-0.9c-2.6-0.5-5.2-1-7.8-1.4-1.6-0.3-3.3-0.6-4.9-0.8-0.4-0.1-0.8-0.1-1.2-0.2-57.1-67.9-142.3-108-231.8-108-145.2 0-268.7 102.7-296.9 242.6C126 457.1 89 523.9 89 595.4 89 711.5 183.5 806 299.6 806h162.2c-0.5-3.2-0.9-6.4-0.9-9.8V567.8l-63.7 63.7c-22.9 22.9-60.1 22.9-83 0s-22.9-60.1 0-83l163.9-163.9c22.9-22.9 60.1-22.9 83 0L725 548.5c22.9 22.9 22.9 60.1 0 83-11.5 11.5-26.5 17.2-41.5 17.2s-30-5.7-41.5-17.2l-63.7-63.7v228.4c0 3.3-0.3 6.6-0.9 9.8h99c144.6 0 262.2-117.6 262.2-262.2 0.1-4.4 0-8.7-0.3-13z"
                                        p-id="715" fill="#2c2c2c"/>
                                </svg>
                            </div>
                        </div>
                    </Uploader>
                </div>
            )
        }

        const imageClassnames = classNames({
            'app-image-library-image': true,
            'app-image-library-image-default': load === 'success' || load === 'uploadLoading',
            'app-image-library-image-updata': load === 'default',
            'app-image-library-image-error': load === 'error'
        })

        return (
            <>
                <div style={{width: widthUpload, height: heightUpload}} className={imageClassnames}>
                    {viewImage()}
                    {viewState()}
                </div>
                {viewSvgIcons()}
                {viweUploader()}
            </>
        )
    }


    public render() {
        const {width, height} = this.state
        return (
            <>
                <div className={'app-image-library-picture-card-uploader'}>
                    <div className={'app-image-library-picture-card-select-group'}>
                        <div className={'app-image-library-picture-card-item'} style={{width, height}}>
                            <div className={'app-image-library-image-box'}>
                                {this._viewComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}
