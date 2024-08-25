import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const RatingStar = ({ rating }) => {
  return (
    <Box component="fieldset" borderColor="transparent">
      <Rating
        name="read-only"
        value={rating}
        readOnly
        IconContainerComponent={({ value, ...props }) => (
          <span style={{ fontSize: 20 }} {...props} />
        )}
      />
    </Box>
  );
};

export default RatingStar;
