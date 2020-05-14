import * as React from 'react';
import {Button, ButtonToolbar, Container, Content, Footer, Header, Modal} from 'rsuite';
import {LoadPanel, LongPanel, HeadPanel} from '@component/panel';
import {IStateFormValue, IFormValue} from '../index.types';
import ProductSkuParts from '../productAdd/component/skuCartesianTable';
import ProductSku from '../productAdd/component/skuItemTable';
import ProductSkuModal from './productSkuModal';

interface IState {
    formValue: IFormValue
    loader: boolean
    id: any
    cellData: Array<any>
    /**
     * 规格多图
     */
    specImage: boolean
}

export default class Index extends ProductSkuModal {

    public state: IState = {
        cellData: [],
        loader: false,
        id: undefined,
        formValue: JSON.parse(JSON.stringify(IStateFormValue)),
        specImage: true
    }

    componentDidMount(): void {

    }

    private _onShow = () => {
        const {id} = this.props
        this._onLoadEdit(id)
    }

    private _onHide = () => {
        const {onHide} = this.props
        this.setState({
            loader: false,
            id: undefined,
            formValue: {}
        }, () => {
            onHide?.()
        })
    }

    /**
     * 加载编辑
     * @private
     */
    private _onLoadEdit = (id: string = '') => {
        this.handlersGetMaterial(id, (material) => {
            this.setState({
                formValue: material,
                id
            }, () => {
                /**
                 * 必须要分开设置
                 * {@link ProductSku#componentDidMount} 方法会在初始化执行一次构建
                 */
                this.setState({
                    loader: true
                })
            })
        })
    }

    public render() {
        const {formValue, cellData, specImage, loader} = this.state
        const {show} = this.props
        return (
            <>
                <Modal backdrop={'static'} show={show} onHide={this._onHide} onShow={this._onShow} full={true}>
                    <Modal.Header>
                        <Modal.Title>Modal Title</Modal.Title>
                        <HeadPanel title={''}>
                            <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                <ButtonToolbar>
                                    <Button color="blue">
                                        更新
                                    </Button>
                                    <Button color="red">
                                        取消
                                    </Button>
                                </ButtonToolbar>
                            </div>
                        </HeadPanel>
                    </Modal.Header>
                    <Modal.Body>
                        <LoadPanel height={350} hideLoader={loader} outrender={true} queueAnim={false}>
                            <LongPanel style={{height: 650, minHeight: 650}}>
                                <Container>
                                    <Header/>
                                    <Content style={{overflow: 'auto', padding: '0 20px'}}>
                                        <ProductSku formValue={formValue}
                                                    onChangeSpecImage={(value) => {
                                                        this.setState({
                                                            specImage: value
                                                        })
                                                    }}
                                                    onChange={(data, skuData) => {
                                                        formValue.sku = data
                                                        this.setState({
                                                            cellData: skuData,
                                                            formValue
                                                        })
                                                    }}/>
                                        <ProductSkuParts formValue={formValue}
                                                         specImage={specImage}
                                                         cellData={cellData}/>
                                    </Content>
                                    <Footer/>
                                </Container>
                            </LongPanel>
                        </LoadPanel>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

}
