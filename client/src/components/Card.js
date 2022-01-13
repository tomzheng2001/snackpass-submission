import React, { useEffect, useState } from "react";

import { getRestaurant } from "../auth/restaurants.js";
import { getRecentPurchases } from "../auth/items.js";

const Card = (props) => {

    const [restaurant, setRestaurant] = useState();
    const [numPurchasedRecent, setNumPurchasedRecent] = useState();

    useEffect(async () => {
        const res = await getRestaurant(props.restId);
        const numP = await getRecentPurchases(props.itemId)
        setRestaurant(res.name);
        setNumPurchasedRecent(numP[0].quantity);
    }, [])

    const getLastPurchased = (date) => {
        const d = new Date(date).getTime()
        const ms = new Date(Date.now() - d).getTime()
        const seconds = Math.floor((ms / 1000) % 60)
        const minutes = Math.floor((ms / 60000) % 60)
        const hours = Math.floor((ms / 3600000) % 24)
        console.log(ms, hours);

        if (hours !== 0) {
            return `ordered ${hours} hours ago`
        } else if (minutes !== 0) {
            return `ordered ${minutes} minutes ago`
        } else if (seconds !== 0) {
            return `ordered ${seconds} seconds ago`
        }
    }

    return (
        <div key={props.ind} className="card">
            <img className="card__image" src={`images/${props.photo}`} alt="Food" />
            <div className="card__footer">
                <div className="card__footer-left">
                    <h2>{props.title}</h2>
                    <h3>{restaurant}</h3>
                    <div className="card__footer-tags">
                        
                        <p>{getLastPurchased(props.lastpurchased)}</p>
                        <p>{`${numPurchasedRecent} purchased recently`}</p>
                    </div>
                </div>
                <h3 className="card__footer-price">{"$" + props.price}</h3>
            </div>
        </div>
    )
}

export default Card;