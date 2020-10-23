function login(name, password) {
    return fetch("http://localhost:11180/web-lab-4-0.0.1-SNAPSHOT/auth/login",
        {
            method: 'POST',
            headers: {
                Authorization: "Basic " + btoa(name + ":" + password)
            },
        }
    );
}

function register(name, password) {
    return fetch("http://localhost:11180/web-lab-4-0.0.1-SNAPSHOT/users",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": name, "password": password})
        }
    );
}

export default login;
export default register;