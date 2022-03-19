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

new Vue({
    el: "#app",
    data: {
        users: userList
    }
});