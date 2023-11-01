import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = { value: PropTypes.number.isRequired, };

export default function FCCircularStatic(props) {
  const [progress, setProgress] = React.useState(10);


  React.useEffect(() => {
    const timer = setInterval(() => { setProgress((prevProgress) => (prevProgress >= 100 ? props.handleSubmission() : prevProgress + 10)); }, 100);
    return () => { clearInterval(timer); }; }, []);

  return <CircularProgress color="secondary" />;
}