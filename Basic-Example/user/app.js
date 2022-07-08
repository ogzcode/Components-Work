Vue.component("avatar", {
    template: `
    <div :class="className">   
        <img :src="imageSrc"/>
    </div>`,
    props: {
        imageSrc: {
            type: String,
            required: true
        },
        className: {
            type: String,
            required: true
        }
    }
});

Vue.component("friend-box", {
    template: `
    <div class="box">
        <avatar :image-src="avatarInfo.src" :class-name="avatarInfo.className"></avatar>
        <div class="friend__info">
            <p class="box__name">{{friendName}}</p>
            <p class="box__date">{{date}}</p>
            <button class="btn" :class="getButtonStyle" v-on:click="toggle">{{getButtonText}}</button>
        </div>
    </div>`,
    props: {
        avatarInfo: {
            type: Object,
            required: true
        },
        friendName: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            isToggle: false,
        };
    },
    methods: {
        toggle(){
            this.isToggle = !this.isToggle;
        }
    },
    computed: {
        getButtonText(){
            return this.isToggle ? "Accepted" : "Accept";
        },
        getButtonStyle(){
            return this.isToggle ? "accepted" : "box__btn";
        }
    }
});

new Vue({
    el: "#container",
    data: {
        friends: [
            {
                "name": "Joe",
                "date": "19.02.2022",
                "info": {
                    "src": "avatar/man(1).png",
                    "className": "friend__avatar"
                }
            },
            {
                "name": "Luke",
                "date": "11.12.2021",
                "info": {
                    "src": "avatar/gamer.png",
                    "className": "friend__avatar"
                }
            },
            {
                "name": "Jane",
                "date": "9.06.2022",
                "info": {
                    "src": "avatar/woman.png",
                    "className": "friend__avatar"
                }
            }
        ]
    },
    computed: {
        getFriendCount(){
            return this.friends.length;
        }
    }
});