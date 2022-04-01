new Vue({
    el: "#app",
    data: {
        number: "",
        minNumber: 0,
        maxNumber: 10
    },
    methods: {
        generateRandomNumber(){
            this.minNumber = Number(this.minNumber);
            this.maxNumber = Number(this.maxNumber);
            if (this.minNumber > this.maxNumber){
                this.swap();
            }
            console.log(typeof(this.minNumber), typeof(this.maxNumber));
            this.number = Math.floor(Math.random() * (this.maxNumber - this.minNumber)) + this.minNumber;
        },
        swap(){
            let temp = this.minNumber;
            this.minNumber = this.maxNumber;
            this.maxNumber = temp;
        }
    },
    created() {
        this.generateRandomNumber();
    }
});