new Vue({
    el: "#app",
    data: {
        email: "",
        password: "",
        emailState: false,
        passwordState: false,
        isEmpty: true,
        loginState: false
    },
    methods: {
        isSubmit() {
            if (!this.email){
                this.emailState = true;
            }

            if (!this.password){
                this.passwordState = true;
            }

            if (!this.emailState && !this.passwordState){
                this.loginState = true;
                setTimeout(() => this.loginState = false, 2000);
            }

            this.email = "";
            this.password = "";
        }
    }
});