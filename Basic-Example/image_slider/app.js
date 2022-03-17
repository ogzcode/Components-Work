new Vue({
    el: "#app",
    data: {
        index: 0,
        imageList: ["img/flower1.jpg", "img/flower2.jpg", "img/flower3.jpg"]
    },
    computed: {
        getImage(){ 
            return this.imageList[Math.abs(this.index) % 3];
        }
    }
});