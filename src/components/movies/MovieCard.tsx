import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Tooltip } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

interface MovieCardProps {
  title: string;
  description: string;
  imageUrl: string;
  //onButtonClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, description, imageUrl }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 345, margin: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        sx={{ 
          height: 'auto', 
          flexGrow: 1, 
          objectFit: 'cover', 
        }}
        image={imageUrl}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'none' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '1rem',
          }}
        >
          {description}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          size="small"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Learn More'}
        </Button>
        <Tooltip title="Search on Google" arrow enterDelay={300} leaveDelay={200}>
          <Button
            size="small"
            component="a"
            href={`https://www.google.com/search?q=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GoogleIcon />}
          >
          </Button>
        </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;