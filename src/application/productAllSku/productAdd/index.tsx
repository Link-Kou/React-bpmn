import * as React from 'react';
import {Button, ButtonToolbar, Container, Content, Footer, Header} from 'rsuite';
import LongPanel from '@component/longPanel';
import HeadPanel from '@component/headPanel';
import BackColorPanel from '@component/backColorPanel';
import {LoadPanel} from '@component/loadPanel';
import ProductAllSku from './productAllSku';
import ProductSkuParts from './component/skuCartesianTable';
import ProductSku from './component/skuItemTable';
import ProductInfoUnified from './component/infoUnified';
import ProductImageUnified from './component/imageUnified';
import ProductCostUnified from './component/costUnified';
import ProductSpecification from './component/specification';
import {IStateFormValue, IFormValue} from '../index.types';


export default class Index extends ProductAllSku {

    public state = {
        cellData: [],
        formValue: {...IStateFormValue}
    }

    componentDidMount(): void {


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

    public render() {
        const {formValue} = this.state
        return (
            <>
                <BackColorPanel style={{height: '100%'}}>
                    <HeadPanel title={'其他产品新增编辑页'}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <ButtonToolbar>
                                <Button color="blue">
                                    发布产品
                                </Button>
                                <Button color="red">
                                    取消
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </HeadPanel>
                    <LoadPanel hideLoader={true} outrender={true} queueAnim={false}>
                        <LongPanel subHeight={65}>
                            <Container>
                                <Header/>
                                <Content style={{overflow: 'auto', padding: '0 20px'}}>
                                    <ProductInfoUnified formValue={formValue}
                                                        onChange={this._onChange}/>
                                    <ProductImageUnified formValue={formValue}
                                                         onChange={this._onChange}/>
                                    <ProductSku onChange={(data) => {
                                        this.setState({
                                            cellData: data
                                        })
                                    }}/>
                                    <ProductSkuParts cellData={this.state.cellData}/>
                                    <ProductCostUnified/>
                                    <ProductSpecification/>
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
