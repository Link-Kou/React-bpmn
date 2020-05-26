import * as React from 'react';
import {Container, Content, Footer, Header, Button} from 'rsuite';
import {LongPanel} from '@component/panel';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';

// @ts-ignore
import BezierPlugin from 'rc-tween-one/lib/plugin/BezierPlugin';

TweenOne.plugins.push(BezierPlugin);

function Demo() {


    //const rect: any = document.getElementById('app-tool-comments')?.getBoundingClientRect()
    //const x1 = rect.x - event.pageX
    //const y1 = rect.y - event.pageY
    //const val: any = {xy: [x1, y1]}
    const animation: any = {
        bezier: {
            type: 'ease-in',
            autoRotate: false,
            vars: [
                {x: 0, y: 0},
                {x: 800, y: -500}
            ]
        },
        repeat: -1,
        yoyo: true,
        duration: 1200
    }

    return (
        <div style={{position: 'absolute', left: 300, top: 550, zIndex: 9999}}>
            <TweenOne
                animation={animation}
                style={{margin: 0, width: 120, height: 120, backgroundColor: '#007aff'}}
                className="code-box-shape"
            />
            <br/>
            <div onClick={(event) => {

                // bottom: 45
                // height: 35
                // left: 1237
                // right: 1277
                // top: 10
                // width: 40
                // x: 1237
                // y: 10
                //alert(event.clientX)
                //event.clientX - rect?.x
                document.getElementById('app-tool-comments')?.getBoundingClientRect()
            }}>
                click
            </div>
        </div>
    )
}

const Afd = () => {
    const node: HTMLDivElement = document.createElement('div');
    const appRoot: HTMLElement | null = document.getElementById('root');
    const parent: any = appRoot?.parentNode;
    parent.appendChild(node)
    ReactDOM.render(<Demo/>, node)
}

export default class Index extends React.Component {
    public render() {

        return (
            <LongPanel>
                <Container>
                    <Header>
                        <div style={{height: 100, width: '100%', backgroundColor: 'yellow'}}>
                            <Button onClick={() => {
                                Afd()
                            }}>
                                click
                            </Button>
                        </div>
                    </Header>
                    <Content>
                        <div style={{height: 1500, width: '100%', backgroundColor: 'red'}}>

                        </div>
                        <div style={{height: 200, width: '100%', backgroundColor: 'yellow'}}>

                        </div>
                    </Content>
                    <Footer>
                        <div style={{height: 50, width: '100%', backgroundColor: 'red'}}>

                        </div>
                    </Footer>
                </Container>
            </LongPanel>
        )
    }
}
