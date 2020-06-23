import * as React from 'react';
import {Button, Alert} from 'rsuite';
import CodeView from 'react-code-view';
import 'react-code-view/lib/less/index.less';

export default class RedenvelopeTableList extends React.Component {

    public render() {
        return (
            <>
                <CodeView dependencies={{Button, Alert}} showCode={true}>{require('./example.md')}</CodeView>
            </>

        )
    }
}
