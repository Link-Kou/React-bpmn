import * as React from 'react';
import {connect} from 'react-redux';
import {Button} from 'rsuite';

import {Listener} from '../../../../listener';

import './logo.scss'

class HeadUser extends React.Component {

    public render() {
        return (
            <div className="app-head-user-info">
                <Button type="dashed" onClick={() => {
                    Listener.EmitNavMenuSidenav()
                }} style={{marginBottom: 16}}>
                    图标
                </Button>
            </div>
        )
    }

}


export default connect(
    (state: any) => ({
        param: state
    }),
    (dispatch: any) => ({})
)(HeadUser)
