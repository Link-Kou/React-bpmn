import * as React from 'react';

import SplitterLayout from 'react-splitter-layout';

//import 'react-splitter-layout/lib/index.css';

export default class Index extends React.Component {

    public componentDidMount(): void {

    }

    public render() {
        return (
            <SplitterLayout primaryIndex={0} primaryMinSize={400} secondaryMinSize={200}>
                <div>1st</div>
                <div>2nd</div>
            </SplitterLayout>
        )
    }
}
