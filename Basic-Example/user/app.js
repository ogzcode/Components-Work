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
            <button class="box__btn">Accept</button>
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
    }
});

new Vue({
    el: "#container",
    data: {
        info: [
        {
            "src": "avatar/man(1).png",
            "className": "friend__avatar"
        },
        {
            "src": "avatar/gamer.png",
            "className": "friend__avatar"
        },
        {
            "src": "avatar/woman.png",
            "className": "friend__avatar"
        }
    ]
    }
});