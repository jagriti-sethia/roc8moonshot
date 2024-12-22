import React, { useContext } from 'react';
import { EmailContext } from '../../context/Emailcontext';
import "./Emailbox.css";
const Emailbox = () => {
    const { fetchEmails, emails, setPage, page, emailStates, filteredEmails, selectedEmail, setSelectedEmail, markAsRead } = useContext(EmailContext);
    console.log(emails)
    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchEmails(newPage)

    };
    return (
        <div className="length">
            {filteredEmails.length > 0 ? (
                filteredEmails?.map((email) => (
                    <div
                        className={email.id === selectedEmail ? "email-card seleted" : "email-card  "}
                        key={email.id}
                        onClick={() => {
                            setSelectedEmail(email.id);
                            markAsRead(email.id);
                        }}
                    >
                        <span className="avatar">
                            {email.from.name[0].toUpperCase()}
                        </span>

                        <div className="email-details">
                            <p className="email-from">
                                From: <strong>{email.from.name}   &lt;{email.from.email}&gt;</strong>
                            </p>
                            <h2 className="email-subject">Subject: {email.subject}</h2>
                            <p className="email-description">{email.short_description}</p>
                            <div className="email-footer">
                                <span className="email-date">
                                    {new Date(email.date).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}

                                </span>

                                {emailStates[email.id]?.isFavorite && <span className="email-favorite">Favorite</span>}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className='flex text-sm md:text-base items-center justify-center m-10'>No emails found</div>
            )}





            <div className="pagination">
                <button
                    className={`page-button ${page === 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
                <button
                    className={`page-button ${page === 2 ? 'active' : ''}`}
                    onClick={() => handlePageChange(2)}
                >
                    2
                </button>
            </div>
        </div>

    )
}

export default Emailbox