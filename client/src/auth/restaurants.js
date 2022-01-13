const API = process.env.REACT_APP_API_URL;

export const getRestaurant = (restaurantId) => {
    return fetch(`${API}/restaurants/${restaurantId}/`, {
        method: "GET",
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    })
};

export const listRestaurants = () => {
    return fetch(`${API}/listrestaurants/`, {
        method: "GET",
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    })
};