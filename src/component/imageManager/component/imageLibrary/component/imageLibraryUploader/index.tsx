import * as React from 'react';
import {Alert, Button, Icon, IconButton, Uploader} from 'rsuite';

import './imageLibraryUploader.scss'
import {Loader} from '@component/loadPanel';


interface Iprops {

    onSelect?(fileurl: Array<string>): void

    action: string
}

interface IState {
    fileType: Array<{
        fileType: {
            blobFile: any,
            name: string,
            status: 'inited' | 'uploading' | 'error' | 'finished'
            fileKey: string
        },
        base64: string
    }>
}

/**
 * 图片资源库-本地图片上传
 */
export default class ImageLibraryUploader extends React.Component<Iprops> {


    public _uploader: any;

    public state: IState = {
        fileType: []
    };

    /**
     * 加载图片预览
     * @param file
     * @param callback
     */
    private getPreviewFile(file: File, callback: (result: string | ArrayBuffer | null) => void) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

    /**
     * 渲染预览图片
     */
    public renderViewImagePreview() {
        const {fileType} = this.state
        return fileType.map((k, i, a) => (
            <div>
                {
                    k.fileType.status === 'uploading' ? <Loader/> : null
                }
                {
                    k.fileType.status === 'finished' ?
                        <div style={{position: 'absolute', height: '100%', width: '100%'}}
                             className={'app-handle-img-success'}/> : null
                }
                {
                    k.fileType.status === 'error' ? <div style={{position: 'absolute', height: '100%', width: '100%'}}
                                                         className={'app-handle-img-error'}/> : null
                }
                <img alt={''} src={k.base64}/>
                {
                    k.fileType.status !== 'finished' ? <>
                        <IconButton appearance="link"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0
                                    }}
                                    icon={<Icon icon="file-upload"/>}
                                    size="lg"
                                    onClick={() => {
                                        this._uploader.start(k.fileType)
                                    }}
                        />
                        <IconButton appearance="link"
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0
                                    }}
                                    icon={<Icon icon="trash-o"/>}
                                    size="sm"
                                    onClick={() => {
                                        this._uploader.handleRemoveFile(k.fileType.fileKey)
                                    }}/>
                    </> : null
                }
            </div>
        ))
    }

    private _FileStatusChange = (FileType: any) => {
        const {fileType} = this.state
        const newfileType = fileType.map((k, i, a) => {
            if (k.fileType.fileKey === FileType.fileKey) {
                k.fileType = FileType
            }
            return k
        });
        this.setState({
            fileType: newfileType
        })
    }


    public render() {
        const {action} = this.props
        return (
            <>
                <div className={'app-image-library'}>
                    <div className={'app-image-library-image'}>
                        {this.renderViewImagePreview()}
                    </div>
                    <Uploader
                        ref={(ref: any) => {
                            this._uploader = ref
                        }}
                        accept={'.jpeg,.jpg,.png,.bmp,.gif,.zip'}
                        multiple={true}
                        autoUpload={false}
                        maxPreviewFileSize={5242880}
                        action={action}
                        shouldQueueUpdate={(fileLists: Array<any>, newFile: Array<any> | any) => {
                            if (fileLists.length > 5) {
                                Alert.error('最多支持五张图片')
                                return false;
                            }
                            return true
                        }}
                        onChange={(FileType: Array<any>) => {
                            FileType.map((k, i, a) => {
                                this.getPreviewFile(k.blobFile, (e) => {
                                    this.setState((prevState: any) => {
                                        prevState.fileType[i] = {
                                            fileType: k,
                                            base64: e
                                        };
                                        return ({fileType: prevState.fileType})
                                    })
                                })
                            })
                        }}
                        //上传开始
                        onUpload={(FileType: any) => {
                            FileType.status = 'uploading'
                            this._FileStatusChange(FileType);
                        }}
                        //上传成功
                        onSuccess={(response: any, FileType: any) => {
                            setTimeout(() => {
                                const status = response?.success ? 'finished' : 'error';
                                FileType.status = status
                                this._FileStatusChange(FileType);
                            }, 800)
                        }}
                        //上传失败
                        onError={(status, FileType) => {
                            setTimeout(() => {
                                this._FileStatusChange(FileType);
                            }, 800)
                        }}
                    >
                        <Button>
                            选择并添加图片
                        </Button>
                    </Uploader>
                    <span>支持JPEG,JPG,PNG,BMP,GIF图片格式，单张图片最大支持5MB,一次性最多支持五张图片</span>
                </div>
            </>
        );
    }

}
