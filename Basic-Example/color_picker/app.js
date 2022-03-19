new Vue({
    el: "#app",
    data: {
        color: "#000"
    },

    methods: {
        calcColor() {
            const hexCode = [
                "0", "1", "2", "3", "4", "5", "6", 
                "7", "8", "9", "A", "B", "C", "D", "E", "F"
            ];
            let clr = "#";
            for (let i = 0; i < 6; i++){
                clr += hexCode[Math.floor(Math.random() * hexCode.length)];
            }

            this.color = clr;
        }
    }
});