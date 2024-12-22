import React, { useContext } from 'react';
import { EmailContext } from '../../context/Emailcontext';
import "./filter.css"

const Filter = () => {
    const { filter, setFilter } = useContext(EmailContext);

    return (
        <div className="header">
            <span>Filter By:</span>

            <button
                className={filter === 'unread' ? "selected-button" : "unsellected-button"}
                onClick={() =>
                    setFilter("unread")}
            >
                Unread
            </button>
            <button
                className={filter === 'read' ? "selected-button" : "unsellected-button"}
                onClick={() =>
                    setFilter("read")}
            >
                Read
            </button>
            <button
                className=
                {filter === 'favorites' ? "selected-button" : "unsellected-button"}
                onClick={() =>
                    setFilter("favorites")}
            >
                Favorites
            </button>
        </div>
    );
};



export default Filter