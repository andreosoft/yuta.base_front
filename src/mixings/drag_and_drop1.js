export default {
    data: function () {
        return {
            drag_src_el: null
        }
    },
    methods: {
        dragstart: function (i, e) {
            this.drag_src_el = i;
            e.srcElement.set;
            e.dataTransfer.effectAllowed = "move";
        },
        dragdrop: function (i, e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            let array = this.value;
            if (this.drag_src_el != i) {
                let data = array[this.drag_src_el];
                array.splice(this.drag_src_el, 1);
                array.splice(
                    i,
                    0,
                    data
                );
                self.drag_src_el = null;
            }
            this.$emit('input', array);
        }
    }
}