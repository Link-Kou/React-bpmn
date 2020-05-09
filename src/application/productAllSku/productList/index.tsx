import * as React from 'react';
import {Container, Content, Footer, Header} from 'rsuite';
import OperationGroup from './component/operation'
import Table from '../productList/component/table'
import BackColorPanel from '@component/backColorPanel';
import {Prompt} from 'react-router';

interface IProps {

}

export default class PoductList extends React.Component<IProps> {

    public state = {}


    public componentDidMount(): void {

    }

    public render() {

        return (
            <>
                <Prompt message="Are you sure you want to leave?"/>
                <BackColorPanel tableBordered={true}>
                    <Container>
                        <Header>
                            <OperationGroup/>
                        </Header>
                        <Content>
                            <Table/>
                        </Content>
                        <Footer/>
                    </Container>
                </BackColorPanel>
            </>
        )
    }

}
