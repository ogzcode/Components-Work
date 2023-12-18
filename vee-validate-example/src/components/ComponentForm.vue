<template>
    <Form @submit="handleSubmit" class="form">
        <h1 class="form-header">Vee Validate Component</h1>
        <div class="form-control">
            <label class="label" for="email">Email</label>
            <Field name="email" type="email" :rules="validateEmail" class="input" />
            <ErrorMessage name="email" class="error-message" />
        </div>
        <div class="form-control">
            <label class="label" for="password">Password</label>
            <Field name="password" :type="show ? 'text' : 'password'" :rules="validatePassword" class="input" />
            <ErrorMessage name="password" class="error-message" />
            <button class="password-visibilty-btn" @click="handleShow()">
                <svg v-if="show" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                    <path
                        d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                    <path
                        d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                </svg>
            </button>
        </div>
        <button class="submit-btn" type="submit">Submit</button>
    </Form>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'

const show = ref(false)

const handleShow = () => {
    show.value = !show.value
}

const handleSubmit = (values, { resetForm }) => {
    console.log(values)
    resetForm();
}

const validateEmail = (value) => {
    if (!value) {
        return 'Email is required'
    }

    if (!value.includes('@')) {
        return 'Email must be valid'
    }

    return true
}

const validatePassword = (value) => {
    if (!value) {
        return 'Password is required'
    }

    if (value.length < 8) {
        return 'Password must be at least 8 characters'
    }

    return true
}
</script>

<style scoped>
.form-header {
    text-align: center;
    margin-bottom: 16px;
    color: #333;
    font-size: 24px;

}

.form {
    width: 400px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-control {
    display: inline-block;
    margin-bottom: 16px;
    position: relative;
}

.label {
    display: block;
    margin-bottom: 8px;
    color: #333;
}

.input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
    width: 100%;
    box-sizing: border-box;
    color: #333;
}

input:focus,
input:active,
input:hover {
    outline: none;
    border-color: #2e9fff;
    box-shadow: 0 0 0 2px #2e9fff33;
}

.error-message {
    color: red;
    font-size: 12px;
}

.password-visibilty-btn {
    position: absolute;
    top: 18px;
    right: 8px;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    color: #333;
}

.submit-btn {
    border: none;
    background: #2e9fff;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
</style>