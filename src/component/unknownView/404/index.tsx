import * as React from 'react';
import {connect} from 'react-redux';

/**
 * 404页面
 */
class Unusual extends React.Component {

    public render() {
        return (
            <div>
                404
            </div>
        )
    }
}

export default connect(
    (state: any) => ({
        param: state
    }),
    (dispatch: any) => ({

    })
)(Unusual)
