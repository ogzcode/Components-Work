<template>
  <div class="m-5">
    <DataTable :value="users" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]">
      <template v-slot:header>
        <div class="p-d-flex p-jc-between">
          <h3>Users</h3>
          <Button label="Add" icon="pi pi-plus" class="p-button-success p-mr-2 text-white" @click="showDialog = true" />
        </div>
      </template>
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="surname" header="Surname"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Phone"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2 text-white"
            @click="handleSetUser(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger text-white"
            @click="handleDeleteUser(slotProps.data.id)"></Button>
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog header="Add User" v-model:visible.sync="showDialog" width="300px">
    <div class="p-fluid">
      <div class="p-field mb-3">
        <label for="name">Name</label>
        <InputText id="name" v-model="user.name" class="mt-2" />
      </div>
      <div class="p-field mb-3">
        <label for="surname">Surname</label>
        <InputText id="surname" v-model="user.surname" class="mt-2" />
      </div>
      <div class="p-field mb-3">
        <label for="email">Email</label>
        <InputText id="email" v-model="user.email" class="mt-2" />
      </div>
      <div class="p-field">
        <label for="phone">Phone</label>
        <InputText id="phone" v-model="user.phone" class="mt-2" />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" class="" @click="showDialog = false" :outlined="true" />
      <Button label="Save" class="" severity="success" @click="handleCreateUser()" />
    </template>
  </Dialog>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { ref, onMounted } from 'vue';

import { getAllUsers, createUser, deleteUser, updateUser } from "./services/request.js";

const users = ref([]);
const showDialog = ref(false);
const user = ref({
  name: "",
  surname: "",
  email: "",
  phone: "",
});

const handleSetUser = (u) => {
  user.value = { ...u };
  showDialog.value = true;
};


const handleCreateUser = async () => {
  if (users.value.find((u) => u.id === user.value.id)) {
    handleUpdateUser(user.value.id);
  }
  else {
    const res = await createUser(user.value);
  }

  showDialog.value = false;
  user.value = {
    name: "",
    surname: "",
    email: "",
    phone: "",
  };

  getAllUsers().then((res) => {
    users.value = res.data.users;
  });
};

const handleDeleteUser = async (id) => {
  const res = await deleteUser(id);

  getAllUsers().then((res) => {
    users.value = res.data.users;
  });
};

const handleUpdateUser = async (id) => {
  const res = await updateUser(id, user.value);
  users.value = res.data.users;
};

onMounted(async () => {
  const res = await getAllUsers();
  users.value = res.data.users;
});

</script>


<style scoped></style>
