import React from 'react'
import './About.scss'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, ImageList } from '@mui/material';
import {images} from "../../constants"
function About() {
  return (
    <>
      <h2 className="head-text">Your offical records<span> are fovever yours</span> <br />Own and Share <span>Your Achievements  </span></h2>
      <div className='app__profiles'>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            width="200"
            image={images.about02}
          />
          <CardContent>
              <Typography gutterBottom variant="h8" component="div">
                <h3>Upload</h3>
              </Typography>
          </CardContent>
      </CardActionArea>
      </Card>
    
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            width="200"
            image={images.about02}
          />
          <CardContent>
              <Typography gutterBottom variant="h8" component="div">
                <h3>Verify</h3>
              </Typography>
          </CardContent>
      </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            width="200"
            image={images.about02}
          />
          <CardContent>
              <Typography gutterBottom variant="h8" component="div">
                <h3>Share</h3>
              </Typography>
          </CardContent>
      </CardActionArea>
      </Card>
        </div>
    </>
  )
}

export default About