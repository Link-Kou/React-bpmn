import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import BannerConfigPanelList from './component/panelList';
import BannerConfigTable from './component/bannerTable';

export default class BannerConfig extends React.Component {

    public render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xsHidden={true} smHidden={true}>
                        <BannerConfigPanelList/>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18}>
                        <BannerConfigTable/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
