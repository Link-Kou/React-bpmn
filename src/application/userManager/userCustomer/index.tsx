import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import {BackColorPanel, LoadPanel} from '@component/panel';
import UserTable from './component/userTable';
import UserInfo from './component/userInfo';
import UserFund from './component/userFund';
import UserBalance from './component/userBalance';

export default class CartonList extends React.Component {

    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={17} sm={17} md={17}>
                            <BackColorPanel tableBordered={true}>
                                <UserTable/>
                            </BackColorPanel>
                        </Col>
                        <Col sm={7} xs={7} md={7} smHidden={true}>
                            <BackColorPanel style={{backgroundColor: 'transparent'}}>
                                <LoadPanel subHeight={78}
                                           loadering={false}
                                           outrender={false}
                                           queueAnim={false}>
                                    <BackColorPanel>
                                        <UserInfo/>
                                    </BackColorPanel>
                                    <BackColorPanel>
                                        <UserFund/>
                                    </BackColorPanel>
                                    <BackColorPanel>
                                        <UserBalance/>
                                    </BackColorPanel>
                                </LoadPanel>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
