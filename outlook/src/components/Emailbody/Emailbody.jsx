import React, { useState, useEffect, useContext } from "react";
import { EmailContext } from '../../context/Emailcontext';
import { fetchEmailBody } from "../../services/service";
import "./Emailbody.css"
const Emailbody = ({ email }) => {
    const { emails, toggleFavorite } = useContext(EmailContext);
    const [emailBody, setEmailBody] = useState(null);
    const emailViewed = emails?.find((email) => email.id === emailBody?.id);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(emailViewed, "email body")
    useEffect(() => {
        if (!email) return;

        const loadEmailBody = async () => {
            setLoading(true);
            try {
                const data = await fetchEmailBody(email);
                setEmailBody(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadEmailBody();
    }, [email]);

    if (loading) return <div className="email-vieww">Loading ...</div>;
    if (error) return <div className="email-vieww">Error: {error}</div>;
    if (!emailBody) return <div className="email-vieww">Select an email to view its body.</div>;
    return (
        <div >

            <div className="email-vieww">
                <span className="avatar">
                    {emailViewed?.from.name[0].toUpperCase()}
                </span>
                <div className="email-details">
                    <div className="subject-fav-div">
                        <span className="body-subject"> Subject: {emailViewed?.subject}</span>
                        <button onClick={() => toggleFavorite(emailViewed?.id)}>
                            {emailViewed?.isFavorite ? 'Unfavorite' : 'Mark as Favorite'}
                        </button>
                    </div>
                    <span className="email-date">
                        {new Date(emailViewed?.date).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                    <div
                        className="email-body"
                        dangerouslySetInnerHTML={{ __html: emailBody?.body }}
                    />
                    {/* {emailBody?.body} */}
                </div>
            </div>
        </div>
    )
}

export default Emailbody