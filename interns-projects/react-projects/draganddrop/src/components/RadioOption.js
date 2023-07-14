import React, { useState } from 'react';

import FormControl from '@mui/material/FormControl';

import Radio from '@mui/material/Radio';

import RadioGroup from '@mui/material/RadioGroup';

import FormControlLabel from '@mui/material/FormControlLabel';




const  RadioButton= ()=> {

  const [selectedOption, setSelectedOption] = useState('');




  const handleOptionChange = (event) => {

    setSelectedOption(event.target.value);

  };




  return (

    <div>

      <FormControl component="fieldset">

        <RadioGroup

          name="radio-buttons-group"

          value={selectedOption}

          onChange={handleOptionChange}

        >

          <FormControlLabel

            value="dummy1"

            control={<Radio color="success" />}

            label="dummy1"

          />

          <FormControlLabel

            value="dummy2"

            control={<Radio color="success" />}

            label="dummy2"

          />

          <FormControlLabel

            value="dummy3"

            control={<Radio color="success" />}

            label="dummy3"

          />

          <FormControlLabel

            value="dummy4"

            control={<Radio color="success" />}

            label="dummy4"

          />

          <FormControlLabel

            value="dummy5"

            control={<Radio color="success" />}

            label="dummy5"

          />

        </RadioGroup>

      </FormControl>

      <p>Selected Option: {selectedOption}</p>

    </div>

  );

}




export default RadioButton;