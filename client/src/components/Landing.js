import React, { useEffect, useState } from "react";
import Card from "./Card.js";
import Menu from "./Menu.js";

import { listItems, addItem } from "../auth/items.js";
import { listRestaurants } from "../auth/restaurants.js";


const Landing = () => {

    const [items, setItems] = useState([]);
    const [itemInfo, setItemInfo] = useState({
        name: "",
        price: "",
        photo: "",
        restaurant_id: "",
    });
    const [restaurants, setRestaurants] = useState([]);
    const [showAddMenu, setShowAddMenu] = useState(false);

    useEffect(() => {
        loadRestaurants();
        loadTrendingItems();
    }, [])

    const handleChange = (name) => (event) => {
        const val = name === "photo" ? event.target.files[0] : event.target.value;
        setItemInfo({
            ...itemInfo,
            [name]: val
        })
    };

    const loadTrendingItems = () => {
        listItems().then((data) => {
            if (!data.error) {
                setItems(data);
            }
        });
    };

    const loadRestaurants = () => {
        listRestaurants().then((data) => {
            if (!data.error) {
                setRestaurants(data);
            }
        })
    }

    const onCancel = () => {
        setShowAddMenu(false);
    }

    const onClickAdd = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("name", itemInfo.name);
        formData.append("price", itemInfo.price);
        formData.append("food_image", itemInfo.photo);
        formData.append("restaurantId", itemInfo.restaurant_id);
        addItem(formData).then(
            (data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setItemInfo({
                        ...itemInfo,
                        name: "",
                        price: "",
                        photo: "",
                        restaurant_id: "",  
                    });
                }
            }
        )
    }

    const addTitle = (
        <h2 className="addmenu__title">Add Item</h2>
    );

    const addActions = (
        <div className="addmenu__buttons">
            <button onClick={onClickAdd}>Add</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )

    const addContent = (
        <form className="addmenu" 
            encType="multipart/form-data"
            action="/items/addItem/"
        >
            <div>
                <div>
                    <label htmlFor="name">Item Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Item Name"
                        className="addmenu__name"
                        onChange={handleChange("name")}
                    />
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        placeholder="Price"
                        className="addmenu__price"
                        onChange={handleChange("price")}
                    />
                </div>

                <div>
                    <label htmlFor="image">Choose an item image</label>
                    <input
                        type="file"
                        id="image"
                        name="food_image"
                        accept=".png,./jpeg,.jpg"
                        required={true}
                        className="addmenu__image"
                        onChange={handleChange("photo")}
                    />
                </div>
                <div>
                    <label htmlFor="restaurant">Restaurant</label>
                    <select
                        name="restaurant"
                        id="restaurant"
                        onChange={handleChange("restaurant_id")}
                    >
                        <option value="">Select a restaurant</option>
                        {restaurants.map((r, i) => (
                            <option key={i} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>
                
            </div>
            
        </form>
    )

    return (
        <div className="landing">
            <Menu
                title={addTitle}
                content={addContent}
                actions={addActions}
                isopen={showAddMenu}
                closeModal={onCancel}
            />
            <div className="landing__header">
                <div className="landing__header-dropdown">
                    <label htmlFor="restaurants">Filter By Restaurant</label>
                    <select name="restaurants" id="restaurants">
                        <option value="all">All</option>
                        {restaurants.map((r, i) => (
                            <option  key={i} value={r.name}>{r.name}</option>
                        ))}
                    </select>
                </div>
                <h1>Order Now!</h1>
                <div className="landing__header-buttons">
                    <button onClick={() => setShowAddMenu(true)}>Add Item</button>
                    <button>Purchase Item</button>
                </div>
            </div>
            <div className="landing__items">
                {items.map((item, i) => (
                    <Card ind={i} itemId={item.item_id} photo={item.photo} restId={item.restaurant_id} title={item.name} price={item.price} lastpurchased={item.last_purchased} />
                ))}
            </div>
        </div>
    );
};

export default Landing;