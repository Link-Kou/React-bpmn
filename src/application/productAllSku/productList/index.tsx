import * as React from 'react';
import {Container, Content, Footer, Header} from 'rsuite';
import OperationGroup from './component/operation'
import Table from '../productList/component/table'
import {BackColorPanel} from '@component/panel';
import ProductList from './productList';
import ProductSkuModal from '../productSkuModal';


export default class index extends ProductList {

    public state = {
        skuModal: false,
        id: undefined
    }


    public componentDidMount(): void {

    }

    public render() {
        const {skuModal, id: fid} = this.state
        return (
            <>
                <BackColorPanel tableBordered={true}>
                    <Container>
                        <Header>
                            <OperationGroup/>
                        </Header>
                        <Content>
                            <ProductSkuModal show={skuModal}
                                             id={fid}
                                             onHide={() => {
                                                 this.setState({
                                                     skuModal: false
                                                 })
                                             }}/>
                            <Table
                                onShowSku={(id) => {
                                    this.setState({
                                        skuModal: true,
                                        id
                                    })
                                }}
                                onLoadTableData={this.handlersLoadProductPage}/>
                        </Content>
                        <Footer/>
                    </Container>
                </BackColorPanel>
            </>
        )
    }

}
