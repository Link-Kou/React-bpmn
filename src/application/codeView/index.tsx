import * as React from 'react';
import {Button, Alert} from 'rsuite';
import CodeView from 'react-code-view';
import 'react-code-view/lib/less/index.less';

export default class RedenvelopeTableList extends React.Component {

    public _CodeView: any

    public state = {
        code: 'const instance = <Button onClick={(e)=> Alert.success(\'sdsd\')}>Test</Button>;ReactDOM.render(instance);'
    }

    componentDidMount(): void {
        /*fetch('https://raw.githubusercontent.com/simonguo/react-code-view/master/docs/example.md', {
            mode: 'cors',
            method: 'GET'
        })
            .then((response) => {
                return response.text()
            })
            .then((response) => {
                const parseHTMLs:any = parseHTML(response)
                this._CodeView.executeCode(parseHTMLs.code)
            })
            .catch((error) => {
                console.log(error)
            })*/

        this._CodeView.executeCode(this.state.code)
    }

    public render() {
        return (
            <>
                <CodeView dependencies={{Button, Alert}} showCode={true}>{require('./example.md')}</CodeView>
                <CodeView ref={ref => this._CodeView = ref} dependencies={{Button, Alert}} showCode={true}
                          source={' '}/>
            </>

        )
    }
}
