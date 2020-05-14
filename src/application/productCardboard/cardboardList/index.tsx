import * as React from 'react';
import {Container, Content, Dropdown, Footer, Header} from 'rsuite';
import CardboardListTable from './component/cardboardListTable';
import {BackColorPanel, HeadPanel} from '@component/panel';
import CardboardList from './cardboardList';
import {RouterHistory, RouterPath} from '@router';


export default class Index extends CardboardList {


    public render() {
        return (
            <>
                <BackColorPanel tableBordered={true}>
                    <Container>
                        <Header>
                            <HeadPanel hideBorderBottom={true} title={'纸板产品列表'}>
                                <Dropdown title={'产品管理'} trigger="click" onSelect={(e) => {
                                    RouterHistory.push(RouterPath.CardboardAdd)
                                }}>
                                    <Dropdown.Item>新增产品</Dropdown.Item>
                                </Dropdown>
                            </HeadPanel>
                        </Header>
                        <Content>
                            <CardboardListTable onLoadTableData={this.handlersLoadCardboardProductPage}/>
                        </Content>
                        <Footer/>
                    </Container>
                </BackColorPanel>
            </>
        )
    }
}
