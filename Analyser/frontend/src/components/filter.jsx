// import React from 'react'

// const Filter = () => {
//     return (
//         <div>login page</div>
//     )
// }

// export default Filter

import React, { useState, useEffect } from "react";
import { useFilters } from "../contexts/filtercontext";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FaUser,
  FaVenusMars,
  FaCalendarAlt,
  FaRedo,
  FaShareAlt,
} from "react-icons/fa";
import "./filter.css";

const Filter = () => {
  const {
    ageRange,
    setAgeRange,
    gender,
    setGender,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useFilters();

  const [dates, setDates] = useState([]);
  const [filteredEndDates, setFilteredEndDates] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/chart/data`
        );
        const uniqueDates = Array.from(
          new Set(response?.data.map((entry) => entry.Day))
        );
        setDates(uniqueDates);
      } catch (error) {
        console.error("Error fetching date data", error);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    const savedAgeRange = Cookies.get("ageRange");
    const savedGender = Cookies.get("gender");
    const savedStartDate = Cookies.get("startDate");
    const savedEndDate = Cookies.get("endDate");

    if (savedAgeRange) setAgeRange(savedAgeRange);
    if (savedGender) setGender(savedGender);
    if (savedStartDate) {
      setStartDate(savedStartDate);
      const availableEndDates = dates.filter((date) => date > savedStartDate);
      setFilteredEndDates(availableEndDates);

      if (savedEndDate && availableEndDates.includes(savedEndDate)) {
        setEndDate(savedEndDate);
      } else {
        setEndDate("");
      }
    }
  }, [dates, setAgeRange, setGender, setStartDate, setEndDate]);

  useEffect(() => {
    if (ageRange) Cookies.set("ageRange", ageRange, { expires: 7 });
    if (gender) Cookies.set("gender", gender, { expires: 7 });
    if (startDate) Cookies.set("startDate", startDate, { expires: 7 });
    if (endDate) Cookies.set("endDate", endDate, { expires: 7 });
  }, [ageRange, gender, startDate, endDate]);

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
    const availableEndDates = dates.filter((date) => date > selectedStartDate);
    setFilteredEndDates(availableEndDates);
    setEndDate("");
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAgeRange(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleReset = () => {
    setAgeRange("");
    setGender("");
    setStartDate("");
    setEndDate("");
    Cookies.remove("ageRange");
    Cookies.remove("gender");
    Cookies.remove("startDate");
    Cookies.remove("endDate");
  };

  const generateShareableUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();

    if (ageRange) params.append("ageRange", ageRange);
    if (gender) params.append("gender", gender);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    return `${baseUrl}/?${params.toString()}`;
  };

  const handleShare = () => {
    const shareableUrl = generateShareableUrl();
    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        setCopySuccess("Link copied to clipboard!");
      })
      .catch(() => {
        setCopySuccess("Failed to copy link.");
      });
  };

  useEffect(() => {
    console.log("hello world")
    if (copySuccess) {
      setShowCopySuccess(true);
      const timer = setTimeout(() => {
        setShowCopySuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const isAnyFilterSelected = ageRange || gender || startDate || endDate;

  return (
  <>
    <div className="filter-container">
      <h2 className="filter-title">Filter Options</h2>
      <div className="filter-grid">
        <div>
          <label className="filter-label">
            <FaUser className="filter-icon" /> Age Range:
          </label>
          <select
            value={ageRange}
            onChange={handleAgeChange}
            className="filter-select"
          >
            <option value="">Select Age Range</option>
            <option value="15-25">15-25</option>
            <option value=">25">&gt; 25</option>
          </select>
        </div>
        <div>
          <label className="filter-label">
            <FaVenusMars className="filter-icon" /> Gender:
          </label>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="filter-select"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="filter-label">
            <FaCalendarAlt className="filter-icon" /> Start Date:
          </label>
          <select
            value={startDate}
            onChange={handleStartDateChange}
            className="filter-select"
          >
            <option value="">Select Start Date</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="filter-label">
            <FaCalendarAlt className="filter-icon" /> End Date:
          </label>
          <select
            value={endDate}
            onChange={handleEndDateChange}
            className="filter-select"
          >
            <option value="">Select End Date</option>
            {filteredEndDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="filter-actions">
        <button
          onClick={handleReset}
          disabled={!isAnyFilterSelected}
          className={`filter-button reset-button ${!isAnyFilterSelected ? "disabled" : ""}`}
        >
          <FaRedo className="button-icon" /> Reset
        </button>

        <button
          onClick={handleShare}
          disabled={!isAnyFilterSelected}
          className={`filter-button share-button ${!isAnyFilterSelected ? "disabled" : ""}`}
        >
          <FaShareAlt className="button-icon" /> Share
        </button>
      </div>
      {showCopySuccess && <p className="copy-success-message">{copySuccess}</p>}
    </div>
    </>
  );
};

export default Filter;
