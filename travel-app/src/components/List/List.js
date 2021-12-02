import React, { useState, useEffect, createRef } from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({ places, childClicked }) => {
  const classes = useStyles();

  const [type, setType] = useState('restaurant');
  const [rating, setRating] = useState('');

  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    const refs = Array(PlaceDetails.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);

  const selectHandler = (e) => {
    setType(e.target.value);
  };

  const ratingHandler = (e) => {
    setRating(e.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants Near You...
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={selectHandler}>
          <MenuItem value="restaurant">Restaurants</MenuItem>
          {/* <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="Attractions">Attractions</MenuItem> */}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={ratingHandler}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, index) => {
          return (
            <Grid item ref={elRefs[index]} key={index} xs={12}>
              <PlaceDetails
                place={place}
                selected={Number(childClicked) === index}
                refProp={elRefs[index]}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default List;
