import * as React from 'react';
import classNames from 'classnames'
import {LoaderIcons} from '@component/panel';
import {Modal} from 'rsuite';
import {ImageViewer} from '@imageManager/index';

interface Iprops {
    /**
     * 文件路径
     */
    fileUrl?: string
}

/**
 * 图片-显示
 */
export default class ImageCardView extends React.Component<Iprops> {


    public state = {
        //文件地址
        fileUrl: '',
        //加载进度 ：default|success|error|loading
        load: 'loading',
        img: {},
        show: false
    };

    public componentDidMount(): void {

    }

    /**
     * 模态窗口显示
     * @private
     * @private
     */
    public renderModalImageViewer() {
        const {show, fileUrl} = this.state
        const close = () => {
            this.setState({
                show: false
            })
        }
        return (
            <Modal
                size={'sm'}
                show={show}
                onHide={close}
            >
                <Modal.Header>
                    <Modal.Title>图片查看器</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{height: 300, width: '100%'}}>
                        <ImageViewer ImageUrl={fileUrl}/>
                    </div>
                </Modal.Body>
                <Modal.Footer/>
            </Modal>
        )
    }

    /**
     * 显示控件
     */
    public renderViewComponent() {
        const {load} = this.state
        const {fileUrl} = this.props
        const viewImage = () => {
            return (
                <>
                    {
                        load === 'loading' ? <LoaderIcons/> : undefined
                    }
                    {
                        fileUrl ? (
                            <img style={{opacity: load === 'success' ? 1 : 0}} alt={''} src={fileUrl}
                                 onLoad={() => {
                                     this.setState({
                                         load: 'success'
                                     })
                                 }}
                                 onError={() => {
                                     this.setState({
                                         load: 'error'
                                     })
                                 }}
                            />
                        ) : undefined
                    }
                </>
            )
        }

        const viewShow = () => {
            if (load === 'success') {
                return (
                    <div className={'app-image-library-icon'}>
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             onClick={() => {
                                 this.setState({
                                     show: true,
                                     fileUrl
                                 })
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
                    </div>
                )
            }
            return undefined
        }

        const imageClassnames = classNames({
            'app-image-library-image': true,
            'app-image-library-image-default': load === 'default',
            'app-image-library-image-updata': false,
            'app-image-library-image-error': load === 'error'
        })
        return (
            <>
                <div className={imageClassnames} id={'imageCardView'}>
                    {viewImage()}
                </div>
                {viewShow()}
            </>
        )
    }


    public render() {
        return (
            <div className={'app-image-library-picture-card-select-group'}>
                {this.renderModalImageViewer()}
                <div className={'app-image-library-picture-card-item'}>
                    <div className={'app-image-library-image-box'}>
                        {this.renderViewComponent()}
                    </div>
                </div>
            </div>
        );
    }

}
