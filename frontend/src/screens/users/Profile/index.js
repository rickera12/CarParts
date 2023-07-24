import { Grid, Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FaUser } from 'react-icons/fa';

import { useUser } from '../../../context/UserContext';

const useStyles = makeStyles({
  profileCard: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  avatar: {
    width: '10rem',
    height: '10rem',
    fontSize: '4rem',
  },
});

export const ProfileScreen = () => {
  const { user } = useUser();
  const classes = useStyles();

  if (!user) {
    return <p>Loading...</p>;
  }

  const isProfileIncomplete = user.status === 'created';

  const handleCompleteProfile = () => {};

  return (
    <Grid container justifyContent='center' spacing={2}>
      <Grid item xs={12} md={6}>
        <Card className={classes.profileCard}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <FaUser style={{ fontSize: '4rem' }} />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6' align='center'>
                  Profile
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body1' align='center'>
                  Email: {user.email}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isProfileIncomplete && (
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>Complete Profile</Typography>
                      <Typography>You need to complete your profile to access additional features.</Typography>
                      <Button variant='contained' color='primary' onClick={handleCompleteProfile}>
                        Complete Profile
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
