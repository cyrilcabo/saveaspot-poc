import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import io from 'socket.io-client';

import MuiList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import styles from '../styles/List.module.css';

const List = () => {
  const [listItems, setListItems] = useState([]);
  const [socket, setSocket] = useState(null);
  const spaces = listItems.map(l => (
    <>
      <ListItem
        secondaryAction={(
          <Chip
            label={l.available ? 'Available' : 'Occupied'}
            color={l.available ? 'success' : 'error'}
            variant="filled"
          />
        )}
      >
        <ListItemIcon>
          {l.available ? <CheckCircleIcon color="success" /> : <RemoveCircleIcon color="error" />}
        </ListItemIcon>
        <ListItemText
          primary={`${l.location.name}, ${l.location.spot}`}
          secondary={l.location.address}
        />
      </ListItem>
      <Divider component="li" variant="inset" />
    </>
  ));

  const fetchItems = async () => {
    const items = await fetch('/api/spaces').then(res => res.json());
    setListItems(items);
  };

  const initializeSocket = async () => {
    await fetch('/api/socket');
    setSocket(io());
  };

  useEffect(() => {
    fetchItems();
    initializeSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('refresh', () => {
        fetchItems();
      });
    }
  }, [socket]);

  return (
    <div className={styles.root}>
      <Head>
        <title>SaveASpot - Spaces</title>
        <meta name="description" content="Save me parking spaces!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h3">
        Parking spaces
      </Typography>
      <MuiList>
        {spaces}
      </MuiList>
    </div>
  );
};

export default List;