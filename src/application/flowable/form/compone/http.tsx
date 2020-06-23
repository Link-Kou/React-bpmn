import * as React from 'react';
import {ControlLabel, Form, FormControl, FormGroup, HelpBlock} from 'rsuite';

/**
 *
 * @author lk
 * @date 2020/6/19 13:42
 * @version 1.0
 */
export default class index extends React.Component {

    public render() {
        return (
            <Form>
                <FormGroup>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl name="name" />
                    <HelpBlock>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl name="email" type="email" />
                    <HelpBlock tooltip={true}>Required</HelpBlock>
                </FormGroup>
            </Form>
        )
    }
}
