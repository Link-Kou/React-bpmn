import * as React from 'react';
import {Container, Content, Footer, Header} from 'rsuite';
import SplitterLayout from 'react-splitter-layout';
import OperationGroup from './component/operation'
import Sort from './component/sort'
import Table from '../productList/component/table'

interface IProps {

}

export default class PoductList extends React.Component<IProps> {

    public state = {}


    public componentDidMount(): void {

    }

    public routerWillLeave(nextLocation: any) {
        return '确认要离开？';
    }

    public render() {

        return (
            <>
                <SplitterLayout customClassName={'dfdf'} percentage={true} primaryIndex={1} primaryMinSize={85}
                                secondaryMinSize={10}
                                secondaryInitialSize={15}>
                    <Sort/>
                    <Container>
                        <Header>
                            <OperationGroup/>
                        </Header>
                        <Content>
                            <Table/>
                        </Content>
                        <Footer/>
                    </Container>
                </SplitterLayout>
            </>
        )
    }

}
