let urls = {
    development: "https://phonebook-api-242.herokuapp.com",
    production: "https://phonebook-api-242.herokuapp.com",
};
let baseURL = urls[process.env.NODE_ENV];
export default baseURL;
