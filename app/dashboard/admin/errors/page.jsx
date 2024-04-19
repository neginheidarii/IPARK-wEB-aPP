"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { db } from '@/lib/firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { LightBulbIcon } from '@heroicons/react/24/solid';
import { cssClasses } from "@/lib/cssClasses";
import { FaSearch } from "react-icons/fa";

export default function ErrorsAndIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const issuesRef = collection(db, 'Issues');
        const q = query(issuesRef);
        const querySnapshot = await getDocs(q);
        const fetchedIssues = [];
        querySnapshot.forEach(doc => {
          const issueData = doc.data();
          fetchedIssues.push({
            id: doc.id,
            title: issueData.title,
            description: issueData.message,
            time: issueData.time,
            parkingLotNumber: issueData.parkingLotId ? issueData.parkingLotId.path : null,
            type: issueData.type
          });
        });
        setIssues(fetchedIssues);
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const filteredIssues = issues.filter(issue =>
    issue.title && issue.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const handleUseClient = () => {
    // Implement functionality for "Use Client" button
    console.log("Using client...");
  };

  return (
    <div style={pageStyle}>
      <div style={{ display: "flex" }}>
        <div style={issuesContainerStyle}>
          <h3 className={`${cssClasses.header1}`}>Errors and Issues</h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Please enter a search term... 🔍"
              style={{ ...searchBarStyle, marginRight: "10px" }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {/* Issues list */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            
            filteredIssues.map((issue) => (
              <div key={issue.id} style={issueCardStyle}>
                {/* Issue details */}
                <h2 style={{ fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>Issue's Information</h2>
                <div style={{ color: "#333", marginBottom: "5px" }}>
                  Title: {issue.title}
                </div>
                {issue.type && (
                  <div style={{ color: "#333", marginBottom: "5px" }}>
                    Type: {issue.type}
                  </div>
                )}
                <div style={{ color: "#333", marginBottom: "10px" }}>
                  Description: {issue.description}
                </div>
                {issue.time && (
                  <div style={{ ...issueTimeStyle, color: "#999" }}>
                    Time: {issue.time}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  maxWidth: '1200px',
  margin: 'auto',
};

const searchBarStyle = {
  padding: '10px',
  width: '50%',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
  marginBottom: '20px',
};

const issuesContainerStyle = {
  width: '100%',
};

const issueCardStyle = {
  padding: '20px',
  borderBottom: '1px solid #eee',
  marginBottom: '10px',
  position: 'relative',
  background: "#cddff2",
  borderRadius: '10px'
};

const issueTimeStyle = {
  fontSize: '12px',
  position: 'absolute',
  top: '20px',
  right: '0',
};

const filterCardStyle = {
  width: '25%',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginLeft: '20px',
  background: 'lightblue',
};

const filterHeaderStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const filterOptionStyle = {
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 15px',
  border: '1px solid transparent',
  borderRadius: '4px',
  margin: '3px',
  cursor: 'pointer',
  fontWeight: 'bold',
  outline: 'none',
  color: 'white',
};