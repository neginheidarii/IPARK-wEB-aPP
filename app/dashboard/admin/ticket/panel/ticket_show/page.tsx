// components/TicketStatus.js
import React from 'react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: "'Arial', sans-serif",
    color: '#333',
    margin: '20px',
    gap: '20px', // This creates space between the main content and sidebar
  },
  mainCard: {
    flex: 3,
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sideCard: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #eaeaea',
  },
  statusIndicator: {
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    marginRight: '20px',
  },
  statusInfo: {
    flex: 1,
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default function TicketStatus() {
  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <h1 style={styles.header}>Ticket Status</h1>
        <div style={styles.statusItem}>
          <div style={{ ...styles.statusIndicator, backgroundColor: '#007bff' }}></div>
          <div style={styles.statusInfo}>
            <h2>1. Ticket in Progress</h2>
            <p>Our team is currently working on resolving your parking issue.</p>
          </div>
        </div>
        <div style={styles.statusItem}>
          <div style={{ ...styles.statusIndicator, backgroundColor: '#28a745' }}></div>
          <div style={styles.statusInfo}>
            <h2>2. Issue Resolved</h2>
            <p>Your parking issue has been resolved. If you have any further questions,</p>
          </div>
        </div>
        <div style={styles.statusItem}>
          <div style={{ ...styles.statusIndicator, backgroundColor: '#6c757d' }}></div>
          <div style={styles.statusInfo}>
            <h2>3. Ticket Closed</h2>
            <p>Your parking issue has been resolved.</p>
          </div>
        </div>
      </div>
      <div>
        <h2 style={{ ...styles.header, color: '#fff', backgroundColor: '#6c757d', padding: '10px', borderRadius: '5px' }}>Ticket Closed</h2>
        <p style={{ marginBottom: '20px' }}>We are sorry for the inconvenience caused. Our team is working hard to resolve your parking issue. Thank you for your patience.</p>
        <button style={styles.button}>Hide Ticket Status</button>
      </div>
    </div>
  );
}
