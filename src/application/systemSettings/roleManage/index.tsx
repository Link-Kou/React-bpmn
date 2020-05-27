import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import RoleList from './component/roleList';
import RoleEdit from './component/roleEdit';


/**
 *
 * @author lk
 * @date 2020/5/27 18:40
 * @version 1.0
 */
export default class RoleManage extends React.Component {

    public state = {
        display: false
    }

    private _onEdit = () => {
        const {display} = this.state
        this.setState({
            display: !display
        })
    }

    public render() {
        const {display} = this.state
        const w = display ? 9 : 12
        return (
            <Grid fluid={true}>
                <Row>
                    {display ? <Col xs={2} sm={2} md={2}/> : <Col xs={6} sm={6} md={6}/>}
                    <Col xs={w} sm={w} md={w}>
                        <RoleList onEdit={this._onEdit} edit={display}/>
                    </Col>
                    {
                        display ?
                            <Col xs={11} sm={11} md={11}><RoleEdit onClose={this._onEdit}/></Col>
                            :
                            <Col xs={6} sm={6} md={6}/>
                    }
                </Row>
            </Grid>
        )
    }
}
