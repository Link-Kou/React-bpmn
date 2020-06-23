export const CustomDescriptor = {
    name: 'customDescriptor',
    uri: '',
    prefix: '',
    associations: [],
    types: [
        /*{
            name: 'ItemSubjectRef',
            //bpmn:DataObject'
            extends: ['bpmn:DataObject'],
            properties: [
                {
                    name: 'itemSubjectRef',
                    isAttr: true,
                    isReference: false,
                    type: 'String'
                }
            ]
        },*/
        {
            name: 'ItemAwareElement',
            superClass: [
                'BaseElement'
            ],
            properties: [
                {
                    name: 'itemSubjectRef',
                    type: 'ItemDefinition',
                    isAttr: true,
                    isReference: false
                },
                {
                    name: 'dataState',
                    type: 'DataState'
                }
            ]
        }
    ]
}
