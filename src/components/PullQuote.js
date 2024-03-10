// components/PullQuote.js

import React from 'react';
import styles from '../../styles/PullQuote.module.css'; // Assuming you will use CSS modules

const PullQuote = ({ text, author }) => {
    return (
        <blockquote className={styles.pullQuote}>
            <p className={styles.quoteText}>{text}</p>
            {author && <footer className={styles.quoteAuthor}>— {author}</footer>}
        </blockquote>
    );
};

export default PullQuote;
