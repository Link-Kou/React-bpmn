import {Col, Grid, Row} from 'rsuite';
import * as React from 'react';
import {BackColorPanel} from '@component/panel';
import UserAdminTable from './component/userAdminTable';
import UserAdminEdit from './component/userAdminEdit';

/**
 * 运营用户管理
 * @author lk
 * @date 2020/5/26 16:20
 * @version 1.0
 */
export default class Index extends React.Component {

    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col sm={15} xs={15} md={15}>
                            <BackColorPanel tableBordered={true}>
                                <UserAdminTable/>
                            </BackColorPanel>
                        </Col>
                        <Col sm={9} xs={9} md={9} smHidden={true}>
                            <BackColorPanel>
                                <UserAdminEdit/>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
