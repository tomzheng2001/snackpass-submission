const API = process.env.REACT_APP_API_URL;

export const listItems = () => {
    return fetch(`${API}/items/list/`, {
        method: "GET",
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    })
};

export const getRecentPurchases = (itemId) => {
    return fetch(`${API}/items/recent/${itemId}/`, {
        method: "GET",
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    })
}

export const addItem = (item) => {
    return fetch(`${API}/items/addItem/`, {
        method: "POST",
        body: item,
    }).then((response) => {
        console.log(response);
        return response.json();
    }).catch((err) => {
        console.log(err);
    })
}
