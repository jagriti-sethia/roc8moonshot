// Base URL for the API
const BASE_URL = "https://flipkart-email-mock.now.sh/";

// emailService.js
export const fetchEmails = async (page) => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`);
    return response.json();
};

export const fetchEmailBody = async (id) => {
    try {
        const url = `${BASE_URL}?id=${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch email body");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching email body:", error);
        throw error;
    }
};