<template>
    <div class="error-page">
        <div class="error">
            <h1>404</h1>
            <p>Page not found</p>
            <router-link class="btn" :to="{ name: 'Login' }">Go Home</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #ef4444;
}

.error {
    text-align: center;
}

h1 {
    font-size: 100px;
    margin: 0;
    padding: 0;
    font-weight: 900;
    color: #fff;
}

p {
    font-size: 30px;
    margin: 0;
    padding: 0;
    font-weight: 900;
    color: #fff;
    margin-bottom: 2rem;

}

.btn {
    background: #1e293b;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    text-decoration: none;
}
</style>