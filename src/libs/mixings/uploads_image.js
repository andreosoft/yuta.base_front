import axios from "axios";
import func from '@/libs/func'
import router from "@/config/router";

export default {
    methods: {
        upload: function(api_uploads, image) {
            this.status = 0;
            let formData = new FormData();
            formData.append("file", image);
            formData.append("name", image.name);
            axios
                .post(api_uploads, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    onUploadProgress: progressEvent => {
                        this.status = parseInt(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                    }
                })
                .then(response => {
                    this.$emit("input", response.data.data.file);
                })
                .catch(function() {
                    console.log("FAILURE!!");
                });
        }
    }
}