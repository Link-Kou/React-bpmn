import * as React from 'react';
import classNames from 'classnames'
import {LoaderIcons} from '@component/panel';
interface Iprops {

    /**
     * 显示事件
     * @param fileUrl
     * @param id
     */
    onShow?(fileUrl: string, id?: string): void

    /**
     * 选择事件
     * @param fileurl
     * @param id
     */
    onSelect?(fileurl: string, id?: string): void

    /**
     * 删除事件
     * @param fileUrl
     * @param id
     */
    onDelete?(fileUrl: string, id?: string): void

    /**
     * id
     */
    id?: string

    /**
     * 文件路径
     */
    fileUrl: string

    /**
     * 禁止选择
     */
    disableSelect?: boolean

    /**
     * 选中
     */
    select?: boolean

}

const Svg = {
    /**
     * 选中标识
     */
    selected: <svg viewBox="0 0 1024 1024" width="25" height="25" style={{
        position: 'absolute',
        top: 22,
        fill: '#fff'
    }}>
        <path
            d="M821.781 269.946c15.863-17.426 42.848-18.693 60.274-2.831 17.425 15.862 18.693 42.847 2.83 60.273L448.761 806.5c-16.55 18.18-44.999 18.65-62.14 1.026L140.08 554.018c-16.43-16.893-16.053-43.906 0.84-60.334 16.893-16.43 43.905-16.053 60.334 0.84l214.927 221 405.6-445.578z"
            p-id="1197"/>
    </svg>
}

/**
 * 图片
 * 模式:显示、查看、选择
 */
export default class ImageCardViewSelectDelte extends React.Component<Iprops> {


    public state = {
        //加载进度 ：default|success|error|loading
        load: 'loading',
        del: false
    };


    /**
     * 渲染组件
     */
    public renderViewComponent() {
        const {load, del} = this.state
        const {id, onShow, onDelete, onSelect, disableSelect, fileUrl} = this.props

        /**
         * 图标显示
         */
        const viewSvgIcons = () => {
            if (load === 'success' && fileUrl !== undefined) {
                /**
                 * 选择Icons
                 */
                const selectSvgIcons = () => {
                    if (disableSelect) {
                        return undefined
                    }
                    return (
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             onClick={() => {
                                 onSelect?.(fileUrl, id)
                             }}
                        >
                            <path
                                d="M512 128c211.2 0 384 172.8 384 384s-172.8 384-384 384-384-172.8-384-384 172.8-384 384-384m0-64C262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448-198.4-448-448-448z"
                                fill="" p-id="760"/>
                            <path
                                d="M448 704c-12.8 0-25.6-6.4-32-12.8L313.6 588.8c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L448 633.6l275.2-275.2c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8l-288 288c-6.4 12.8-19.2 12.8-32 12.8z"
                                fill="" p-id="761"/>
                        </svg>
                    )
                }
                /**
                 * 显示Icons
                 */
                const showSvgIcons = () => {
                    return (
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             onClick={() => {
                                 onShow && onShow(fileUrl, id)
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
                    )
                }
                /**
                 * 删除Icons
                 */
                const delSvgIcons = () => {
                    return (
                        <svg viewBox="0 0 1024 1024" width="20" height="20" onClick={() => {
                            this.setState({
                                del: true
                            })
                        }}>
                            <path
                                d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"
                                fill="#231815" p-id="552"/>
                            <path
                                d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"
                                fill="#231815" p-id="553"/>
                        </svg>
                    )
                }

                return (
                    <div className={'app-image-library-icon'}>
                        {
                            showSvgIcons()
                        }
                        {
                            selectSvgIcons()
                        }
                        {
                            delSvgIcons()
                        }
                    </div>
                )
            }
            return undefined
        }

        /**
         * 图片显示
         */
        const viewImage = () => {
            return (
                <>
                    {load === 'loading' ? <LoaderIcons/> : undefined}
                    <img style={{opacity: load === 'success' ? 1 : 0}} alt={''} src={fileUrl}
                         onError={() => {
                             this.setState({
                                 load: 'error'
                             })
                         }}
                         onLoad={() => {
                             this.setState({
                                 load: 'success'
                             })
                         }}/>
                </>
            )
        }


        const viewSvgDel = () => {
            return (
                <div className={'app-image-library-icon-del-success'}>
                    <svg viewBox="0 0 1024 1024" width="50" height="50"
                         onClick={() => {
                             onDelete?.(fileUrl, id)
                         }}>
                        <path
                            d="M512.4 917c224.3 0 406.1-181.8 406.1-406.1S736.7 104.8 512.4 104.8 106.3 286.6 106.3 510.9C106.4 735.2 288.2 917 512.4 917zM429 742.4c-9.1 0-18.1-3.5-25.1-10.4L246.7 575c-13.9-13.8-13.9-36.3 0-50.2 13.8-13.9 36.3-13.9 50.2 0L429 656.7l314.5-314c13.9-13.9 36.3-13.8 50.2 0 13.8 13.9 13.8 36.3 0 50.2L454.1 732c-7 6.9-16 10.4-25.1 10.4z m0 0"
                            fill="#fff"
                            p-id="1071"/>
                    </svg>
                    <svg viewBox="0 0 1024 1024" width="50" height="50"
                         onClick={() => {
                             this.setState({
                                 del: false
                             })
                         }}>
                        <path
                            d="M510.1 475.9L378.4 339.5c-10.4-10.7-27.4-10.9-38.1-0.5-5.2 4.9-8.2 11.7-8.3 18.9-0.2 7.2 2.6 14.1 7.5 19.2l131.7 136.4-136.4 131.7c-10.7 10.4-10.9 27.4-0.5 38.1 4.9 5.2 11.7 8.2 18.9 8.3 7.2 0.2 14.1-2.6 19.2-7.5l136.4-131.7 131.7 136.4c10.4 10.7 27.4 10.9 38.1 0.5 5.2-4.9 8.2-11.7 8.3-18.9 0.2-7.2-2.6-14.1-7.5-19.2L547.7 514.8l136.4-131.7c10.7-10.4 10.9-27.4 0.5-38.1-4.9-5.2-11.7-8.2-18.9-8.3-7.2-0.2-14.1 2.6-19.2 7.5L510.1 475.9zM220.4 793.2c-155.7-161.3-151.2-418.2 10-574 161.3-155.7 418.2-151.2 574 10 155.7 161.3 151.3 418.2-10 574-161.3 155.7-418.2 151.3-574-10z m0 0"
                            fill="#fff"
                            p-id="948"/>
                    </svg>
                </div>
            )
        }

        const imageClassnames = classNames({
            'app-image-library-image': true,
            'app-image-library-image-default': load === 'default',
            'app-image-library-image-updata': false,
            'app-image-library-image-error': load === 'error'
        })
        return (
            <>
                <div className={imageClassnames}>
                    {viewImage()}
                </div>
                {del ? viewSvgDel() : viewSvgIcons()}
            </>
        )
    }


    public render() {
        const {select} = this.props
        const selectClassnames = classNames({
            'app-image-library--picture-card-item-select': select,
            'app-image-library--picture-card-item-select-hide': !select
        })
        return (
            <>
                <div className={'app-image-library-picture-card-select-group'}>
                    <div className={selectClassnames}>
                        {Svg.selected}
                    </div>
                    <div className={'app-image-library-picture-card-select-group'}>
                        <div className={'app-image-library-picture-card-item'}>
                            <div className={'app-image-library-image-box'}>
                                {this.renderViewComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}
