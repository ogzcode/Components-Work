/*
Vue.component("converter", {
    data() {
        return {
            fah: "",
            cel: ""
        };
    },
    computeds: {
        celToFar(){
            let output = ( parseFloat(this.cel) * 9/5 ) + 32;
            this.fah = parseFloat(output.toFixed(2));
        },
        farToCel(){
            let output = ( parseFloat(this.fah) - 32) * 5/9;
            this.cel = parseFloat( output.toFixed(2));
        }
    },
    template: 
    `
    <div class="container">
        <input type="text" placeholder="Celcius" v-model="celToFar"><br>
        <input type="text" placeholder="Fahrenheit" v-model="farToCel">
    </div>
    `
});
*/


new Vue({
    el: "#app",
    data: {
        fah: "",
        cel: "",
        clickState: false
    },
    methods: {
        convert(){
            if (!this.fah && !this.cel){
                return;
            }

            if (this.fah == ""){
                this.celToFar();
            }
            else {
                this.farToCel();
            }
            
            this.clickState = true;
        },
        celToFar(){
            let output = ( parseFloat(this.cel) * 9/5 ) + 32;
            this.fah = parseFloat(output.toFixed(2));
        },
        farToCel(){
            let output = ( parseFloat(this.fah) - 32) * 5/9;
            this.cel = parseFloat( output.toFixed(2));
        },
        clear(){
            if (!this.clickState){
                return;
            }
            this.cel = "";
            this.fah = "";
            this.clickState = false;
        }
    }
});