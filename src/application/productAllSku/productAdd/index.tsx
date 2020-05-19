import * as React from 'react';
import {Button, ButtonToolbar, Container, Content, Footer, Header} from 'rsuite';
import {LongPanel} from '@component/panel';
import {LoadPanel, BackColorPanel, HeadPanel} from '@component/panel';
import ProductAllSku from './productAllSku';
import ProductSkuParts from './component/skuCartesianTable';
import ProductSku from './component/skuItemTable';
import ProductInfoUnified from './component/infoUnified';
import ProductImageUnified from './component/imageUnified';
import ProductCostUnified from './component/costUnified';
import ProductSpecification from './component/specification';
import {IStateFormValue, IFormValue} from '../index.types';
import {utilsUrl} from '@utils/index';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';

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

export default class Index extends ProductAllSku {

    public state: IState = {
        cellData: [],
        loader: false,
        id: undefined,
        formValue: JSON.parse(JSON.stringify(IStateFormValue)),
        specImage: true
    }

    componentDidMount(): void {
        const {location} = this.props
        const search = utilsUrl.getSearch(location?.search);
        if (search) {
            const id = search.get('id');
            this._onLoadEdit(id)
        } else {
            this.setState({
                loader: true
            })
        }
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

    /**
     * 参数改变
     * @param formValue
     * @private
     */
    private _onChange = async (formValue: IFormValue) => {
        this.setState({
            formValue
        })
    }

    /**
     * 添加或包车
     * @private
     */
    private _onSave = async () => {
        const {formValue, id} = this.state
        await Dialog.SelectLoad({
            title: IntlApi.SaveDelTitle,
            boby: '',
            callback: (e) => {
                if (e.success) {
                    this.handlersAddOrEditMaterial(formValue, id, () => {
                        e.close()
                    })
                }
            }
        })
        console.log(JSON.stringify(this.state.formValue, null, 1))
        //this.handlersAddOrEditMaterial(this.state.formValue)
    }

    public render() {
        const {formValue, cellData, specImage, loader} = this.state
        return (
            <>
                <BackColorPanel style={{height: '100%'}}>
                    <HeadPanel title={'其他产品新增编辑页'}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <ButtonToolbar>
                                <Button color="blue" onClick={this._onSave}>
                                    发布产品
                                </Button>
                                <Button color="red">
                                    取消
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </HeadPanel>
                    <LoadPanel loadering={loader} outrender={true} queueAnim={false}>
                        <LongPanel subHeight={65}>
                            <Container>
                                <Header/>
                                <Content style={{overflow: 'auto', padding: '0 20px'}}>
                                    <ProductInfoUnified formValue={formValue}
                                                        onChange={this._onChange}/>
                                    <ProductImageUnified formValue={formValue}
                                                         onChange={this._onChange}/>
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
                                                     cellData={cellData}
                                                     onChange={this._onChange}/>
                                    <ProductCostUnified formValue={formValue}
                                                        onChange={this._onChange}/>
                                    <ProductSpecification formValue={formValue}
                                                          onChange={this._onChange}/>
                                </Content>
                                <Footer/>
                            </Container>
                        </LongPanel>
                    </LoadPanel>
                </BackColorPanel>
            </>
        )
    }

}
