import React from 'react';
import './select-dropdown.styles.scss';

import Select from 'react-select';

const scaryAnimals = [
    { label: "HTML", value: 'html' },
    { label: "Image", value: 'image' },
    { label: "DOCX", value: 'docx' },
    { label: "Text", value: 'text' },
  ];

const SelectDropdown = () => (
    <div className="app">
        <div className="container dropdown">
         <Select options={scaryAnimals} />
        </div>
  </div>
);

export default SelectDropdown;