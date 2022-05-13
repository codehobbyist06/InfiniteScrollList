import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import './UserData.css';
import Button from '@mui/material/Button';

const UserData = ({ statushandler }) => {
  //Define react state variables
  const [data, setData] = useState([]);
  const [lastElement, setlastElement] = useState(null);

  //   Define observer to observe the last element
  const lastElementObserver = useRef(null);

  /**
   * Used to fecth the user data from the API and update the corresponding state
   */
  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'https://randomuser.me/api/',
      params: { results: 10 },
    })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        res = res['results'].map((user) => {
          return {
            name:
              user['name']['title'] +
              ' ' +
              user['name']['first'] +
              ' ' +
              user['name']['last'],
            image: user['picture']['thumbnail'],
          };
        });
        setData((prevData) => {
          return [...prevData, ...res];
        });
        console.log(data);
      });
  };

  //   Initialize the observer
  const setObserver = () => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        fetchData();
      }
    });
    lastElementObserver.current = observer;
  };

  //  Fetch and render the user data
  useEffect(() => {
    fetchData();
    setObserver();
  }, []);

  // Update the observer whenever new data is appended
  useEffect(() => {
    const observer = lastElementObserver.current;
    if (lastElement) {
      observer.observe(lastElement);
    }
    return () => {
      if (lastElement) {
        observer.unobserve(lastElement);
      }
    };
  }, [lastElement]);

  //Logout Handler
  const logoutHandler = () => {
    statushandler(0);
  };

  // return the actual UI
  return (
    <div className='app'>
      <div>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {data.map((info, index) => {
            return (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar alt={info.name} src={info.image} />
                </ListItemAvatar>
                <ListItemText primary={info.name} />
              </ListItem>
            );
          })}
        </List>
        <Box ref={setlastElement} sx={{ width: '200px' }}>
          <LinearProgress />
        </Box>
      </div>
      <div className='logout-button'>
        <Button variant='contained' onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserData;
