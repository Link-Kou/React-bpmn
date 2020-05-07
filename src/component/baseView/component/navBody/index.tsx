import * as React from 'react';
import {connect} from 'react-redux';

import RouterBaseViewBodyItem from '../../../../router/routerBaseItemPathIndex'

import './body.scss'

class Index extends React.Component {

    public state = {}

    public render() {
        return (
            <div className='app-body'>
                <div className='app-nav-Body'>
                    <RouterBaseViewBodyItem/>
                </div>
            </div>

        )
    }
}

export default connect(
    (state: any) => ({
        param: state
    }),
    (dispatch: any) => ({})
)(Index)
