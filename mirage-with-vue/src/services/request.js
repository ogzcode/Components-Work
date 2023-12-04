import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:3000/api",
});


export const getAllUsers = async () => {
    return await request.get("/users");
}

export const createUser = async (user) => {
    return await request.post("/users", user);
}

export const deleteUser = async (id) => {
    return await request.delete(`/users/${id}`);
}

export const updateUser = async (id, user) => {
    return await request.patch(`/users/${id}`, user);
}