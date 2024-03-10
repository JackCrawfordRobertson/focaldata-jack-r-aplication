// components/BodyCopy.js

import React from 'react';

const BodyCopy = ({ htmlText, fontSize = '1.2rem', color = 'black', fontWeight = 'normal' }) => {
    return (
        <p style={{ fontSize, color, fontWeight }} dangerouslySetInnerHTML={{ __html: htmlText }}></p>
    );
};

export default BodyCopy;
