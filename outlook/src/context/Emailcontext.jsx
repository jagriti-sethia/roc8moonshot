import React, { createContext, useEffect, useState } from 'react';

// Create Context
export const EmailContext = createContext();
const EMAIL_STORAGE_KEY = "emailStates";
// Provider Component
export const EmailProvider = ({ children }) => {

    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [filter, setFilter] = useState('unread');
    const saveToStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };
    const getFromStorage = (key, defaultValue = null) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    };
    const [emailStates, setEmailStates] = useState(() =>
        getFromStorage(EMAIL_STORAGE_KEY, {})
    );
    const fetchEmails = async (page) => {
        try {
            setLoading(true);
            const response = await fetch(`https://flipkart-email-mock.vercel.app/?page=${page}`);
            const data = await response.json();

            if (data && data.list) {
                // Add default properties for read and favorite
                const enrichedEmails = data.list.map((email) => ({
                    ...email,
                    isRead: false,
                    isFavorite: false,
                }));

                setEmails(enrichedEmails);
            } else {
                throw new Error('API response does not contain "list"');
            }
        } catch (error) {
            console.error('Error fetching emails:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    //     () => {
    //     return sessionStorage.getItem('filter') || 'unread';
    // });


    useEffect(() => {


        fetchEmails(1);
    }, [page]);





    // Toggle favorite status
    const toggleFavorite = (id) => {
        setEmails((prevEmails) =>
            prevEmails.map((email) =>
                email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
            )
        );

        setEmailStates((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                isFavorite: !prevState[id]?.isFavorite,
            },
        }));
    };

    // Mark email as read
    const markAsRead = (id) => {
        setEmails((prevEmails) =>
            prevEmails.map((email) =>
                email.id === id ? { ...email, isRead: true } : email
            )
        );

        setEmailStates((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                isRead: true,
            },
        }));
    };
    useEffect(() => {
        saveToStorage(EMAIL_STORAGE_KEY, emailStates);
        const state = emailStates[1] || {};
        console.log(state, "emailstates")
    }, [emailStates]);
    // const filteredEmails = () => {
    //     return emails.filter((email) => {
    //         const state = emailStates[email.id] || {};
    //         // if (filter === "favorites") return state.isFavorite;
    //         // if (filter === "read") return state.isRead;
    //         // if (filter === "unread") return !state.isRead;
    //        
    //         return true;
    //     });
    // };

    // Apply filters
    const filteredEmails = emails?.filter((email) => {
        const state = emailStates[email?.id] || {};
        if (filter === 'read') return state.isRead;
        if (filter === 'unread') return !state.isRead;
        if (filter === 'favorites') return state.isFavorite;
        return <div >no email</div>; // 'all'
    });

    return (
        <EmailContext.Provider
            value={{
                emails,
                loading,
                error,
                setEmails,
                selectedEmail,
                setSelectedEmail,
                toggleFavorite,
                markAsRead,
                filter,
                setFilter,
                filteredEmails,
                emailStates,
                page, setPage, fetchEmails
            }}
        >
            {children}
        </EmailContext.Provider>
    );
};