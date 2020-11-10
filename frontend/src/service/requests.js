import {backendHost} from "./config";

export function getUserPoints() {
    return fetch(`${backendHost}/web-lab-4-0.0.1-SNAPSHOT/points`,
        {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth")
            }
        }
    );
}

export function clearUserPoints() {
    return fetch(`${backendHost}/web-lab-4-0.0.1-SNAPSHOT/points`,
        {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth")
            }
        }
    );
}

export function sendForm(x, y, r) {
    return fetch(`${backendHost}/web-lab-4-0.0.1-SNAPSHOT/points`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("auth")
            },
            body: JSON.stringify({"x": x, "y": y, "r": r})
        }
    );
}

export function login(name, password) {
    return fetch(`${backendHost}/web-lab-4-0.0.1-SNAPSHOT/authentication`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": name, "password": password})
        }
    );
}


export function register(name, password) {
    return fetch(`${backendHost}/web-lab-4-0.0.1-SNAPSHOT/users`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": name, "password": password})
        }
    );
}