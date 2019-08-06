import axios from "axios";
import func from '@/libs/func'

export default {
    data: function() {
        return {
            api: null,
            error: null,
            loading: false,
            data: []
        };
    },
    created() {
        this.updateRoute()
    },
    watch: {
        '$route': 'updateRoute',
    },
    methods: {
        updateRoute: function() {
            this.fetchData()
        },
        fetchData() {
            var params = {}
            if (this.$route.query.q) {
                params = func.url_decode(this.$route.query.q)
                if (params.sort) {
                    this.sort = params.sort
                }
                if (params.filters) {
                    this.filters = params.filters
                }
            }
            this.error = null
            this.loading = true
            axios
                .get(this.api, { params: params })
                .then(response => {
                    this.loading = false
                    if (response.data.data == null) {
                        this.data = []
                    } else {
                        this.data = response.data.data
                    }
                })
                .catch(error => { console.log(error) })
        }
    }
};