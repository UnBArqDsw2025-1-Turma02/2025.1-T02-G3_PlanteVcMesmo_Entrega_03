export default class ApiStandardClass {
    static ApiURL = 'URL DA API';

    async get(endpoint) {
        try {
            const response = await fetch(`${this.constructor.ApiURL}${endpoint}`);
            this._checkStatus(response);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async post(endpoint, body) {
        try {
            const response = await fetch(`${this.constructor.ApiURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            this._checkStatus(response);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async put(endpoint, body) {
        try {
            const response = await fetch(`${this.constructor.ApiURL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            this._checkStatus(response);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(endpoint) {
        try {
            const response = await fetch(`${this.constructor.ApiURL}${endpoint}`, {
                method: 'DELETE',
            });
            this._checkStatus(response);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    _checkStatus(response) {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
    }
}