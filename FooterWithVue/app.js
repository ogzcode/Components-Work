const footerData = [
    {
        head: "Company",
        box: {
            isIcon: false,
            values: ["About Us", "Our Services", "Privacy Policy", "Affiliet Program"]
        }
    },
    {
        head: "Get Help",
        box: {
            isIcon: false,
            values: ["FAQ", "Shipping", "Returns", "Order Status", "Payment Options"]
        }
    },
    {
        head: "Online Shop",
        box: {
            isIcon: false,
            values: ["Watch", "Bags", "Shoes", "Dress"]
        }
    },
    {
        head: "Follow Us",
        box: {
            isIcon: true,
            values: ["fab fa-facebook-f", "fab fa-twitter", "fab fa-instagram", "fab fa-linkedin-in"]
        }
    }
];

Vue.component("container", {
    template: `
    <div class="footer__col">
        <h4 class="col__head">{{head}}</h4>
        <box :is-icon="boxData.isIcon" :items="boxData.values"></box>
    </div>
    `,
    props: {
        head: {
            type: String,
            required: true
        },
        boxData: {
            type: Object,
            required: true
        }
    }
});

Vue.component("box", {
    template: `
    <div class="col__box" :class="iconClass">
        <a class="box__link" href="#" v-for="item in items">
            <span class="normal__link" v-if="!isIcon">{{item}}</span>
            <span class="social__link" v-else>
                <i :class="item"></i>
            </span>
        </a>
    </div>
    `,
    props: {
        isIcon: {
            type: Boolean,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    },
    computed: {
        iconClass(){
            return this.isIcon ? "social" : "";
        }
    }
});

new Vue({
    el: "#app",
    data: {
        footer: footerData
    }
});