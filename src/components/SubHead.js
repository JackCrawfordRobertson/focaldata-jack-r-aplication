// components/SubHead.js

import React from 'react';

const SubHead = ({ sectionNumber, title }) => {
    return (
        <h2 style={{ marginTop: '40px', marginBottom:'0', color: '#333' }}>
            Section {sectionNumber}: {title}
        </h2>
    );
};

export default SubHead;
