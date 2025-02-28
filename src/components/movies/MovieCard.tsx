import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

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
      {/* İçerik */}
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
        <Button size="small" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : 'Learn More'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCard;