import * as React from 'react';
import {Container, Content, Footer, Header} from 'rsuite';
import LongPanel from '../../component/longPanel';

export default class Index extends React.Component {
    public render() {
        return (
            <LongPanel>
                <Container>
                    <Header>
                        <div style={{height: 100, width: '100%', backgroundColor: 'yellow'}}>

                        </div>
                    </Header>
                    <Content>
                        <div style={{height: 1500, width: '100%', backgroundColor: 'red'}}>

                        </div>
                        <div style={{height: 200, width: '100%', backgroundColor: 'yellow'}}>

                        </div>
                    </Content>
                    <Footer>
                        <div style={{height: 50, width: '100%', backgroundColor: 'red'}}>

                        </div>
                    </Footer>
                </Container>
            </LongPanel>
        )
    }
}
