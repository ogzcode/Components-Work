import { Server, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
    let server = new Server({
        environment,

        models: {
            user: Model,
        },

        seeds(server) {
            server.create("user", { name: "Bob", age: 15, surname: "Smith", email: "bobsmith@mail.com", phone: "123456789" });
            server.create("user", { name: "Alice", age: 25, surname: "Brown", email: "alice@mail.com", phone: "987654321" });
        },

        routes() {
            this.namespace = "api";
            this.urlPrefix = "http://localhost:3000";

            this.get("/users", (schema) => {
                return schema.users.all();
            });

            this.post("/users", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);

                return schema.users.create(attrs);
            });

            this.delete("/users/:id", (schema, request) => {
                let id = request.params.id;

                return schema.users.find(id).destroy();
            });

            this.patch("/users/:id", (schema, request) => {
                let newAttrs = JSON.parse(request.requestBody);
                let id = request.params.id;
                let user = schema.users.find(id);

                return user.update(newAttrs);
            });
        },
    });

    return server;
}


