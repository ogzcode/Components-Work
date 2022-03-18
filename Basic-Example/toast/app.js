new Vue({
    el: "#app",
    data: {
        text: "Hello world",
        textList: []
    },
    methods: {
        addText() {
            this.textList.push(this.text);
            setTimeout(() => this.textList.pop(), 2000);
        }
    }
});