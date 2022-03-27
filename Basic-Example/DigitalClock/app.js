Vue.component("clock", {
    data() {
        return {
            hour: "00",
            minute: "00",
            second: "00"
        }
    },
    mounted() {
        setInterval(() => this.getClock(), 1000);
    },
    methods: {
        getClock(){
            const date = new Date();
            this.hour = date.getHours();
            this.minute = date.getMinutes();
            this.second = date.getSeconds();

            if (this.hour < 10){
                this.hour = "0" + this.hour;
            }
            if (this.minute < 10){
                this.minute = "0" + this.minute;
            }
            if (this.second < 10){
                this.second = "0" + this.second;
            }
        }
    },
    template: 
    `
    <div class="container">
        <span class="text">{{ hour }}</span>
        <span>:</span>
        <span class="text">{{ minute }}</span>
        <span>:</span>
        <span class="text">{{ second }}</span>
    <div>
    `
});

new Vue({
    el: "#app"
});