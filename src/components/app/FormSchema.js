const Schemas = {

    FormSchema : {
        title: `Default`,
        type: "object",
        required: ["name", "description"],
        properties: {
            name: { type: "string", title: "Name", default: "" },
            description: { type: "string", title: "Description", default : "" }
        }
    },

    UISchema : {
        name: {
            'ui:autofocus': true,
            'ui:placeholder': 'Name of the app',
            'ui:title': 'Name',
        },
        description: {
            'ui:options': { inputType: 'text' },
            'ui:placeholder': 'Description of the app',
            'ui:widget': 'textarea', 'ui:options': { rows: 5 }
        },
    },
    

}


export default Schemas;