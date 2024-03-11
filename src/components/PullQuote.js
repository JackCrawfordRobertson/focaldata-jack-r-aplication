import React from 'react';
import styles from '../../styles/PullQuote.module.css'; // Assuming you will use CSS modules

const PullQuote = ({ text, author }) => {
    const createMarkup = (text) => {
        return { __html: text.replace(/\n/g, '<br />') }; // Replace newline characters with <br /> tags
    };

    return (
        <blockquote className={styles.pullQuote}>
            <p className={styles.quoteText} dangerouslySetInnerHTML={createMarkup(text)}></p>
            {author && <footer className={styles.quoteAuthor}>— {author}</footer>}
        </blockquote>
    );
};

export default PullQuote;
