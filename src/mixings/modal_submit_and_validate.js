import axios from "axios";
import mixingValidator from "./validators";

export default {
    data: function() {
        return {
            api: null,
            fields: null,
            validators: null,
            errors: null,
            loading: false
        };
    },
    methods: {
        submitForm: function() {
            if (this.validateAll(this.fields)) {
                this.submit(this.fields, this.api);
                return true;
            }
            return false;
        },
        submit: function(fields, api) {
            this.loading = true;
            axios
                .post(api, fields)
                .then(response => {
                    this.loading = false;
                    this.fields = response.data.data;
                    this.$emit('close-menu')
                    this.$emit('data-update')
                })
                .catch(e => {
                    console.log(e);
                });
        },
        validateAll: function(fields) {
            var noerror = true;
            for (var index in fields) {
                if (this.validate(index, fields[index])) {
                    noerror = false;
                }
            }
            return noerror;
        },
        validate: function(field, value) {
            if (this.validators[field]) {
                return (this.errors[field] = this.validator(
                    this.validators[field],
                    value
                ));
            }
        }
    }
};