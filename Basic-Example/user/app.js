const userList = [
    {
        "image": "avatar/gamer.png",
        "name": "Joe Doe",
        "userName": "@jODoe",
        "isFriend": false
    },
    {
        "image": "avatar/woman.png",
        "name": "Angel White",
        "userName": "@angele",
        "isFriend": true
    },
    {
        "image": "avatar/man.png",
        "name": "Chris Woo",
        "userName": "@CHwoo",
        "isFriend": false
    },
    {
        "image": "avatar/man(1).png",
        "name": "Mark Brook",
        "userName": "@brookMk",
        "isFriend": true
    },
];

Vue.component("user-box", {
    template: 
    `
    <div class="box-container">
        <div class="box">
            <img v-bind:src="user.image">
            <div class="username">
                <p> {{ user.name }} </p>
                <p> {{ user.userName }}</p>
            </div>
        </div>

        <button v-if="user.isFriend">Send Message</button>
    </div>
    `,
    props: {
        user: {
            type: Object,
            required: true
        }
    }
});

new Vue({
    el: "#app",
    data: {
        users: userList
    }
});