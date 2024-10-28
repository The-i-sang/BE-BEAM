import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function BasicSelect({
  id,
  typeText,
  value,
  onChange,
  datas,
  wrapStyle,
}) {
  return (
    <FormControl sx={wrapStyle}>
      <InputLabel id={id}>{typeText}</InputLabel>
      <Select
        labelId={id}
        id={`${id}-select`}
        value={value}
        onChange={onChange}
        sx={{
          height: "43px",
        }}
      >
        {datas.map((data, idx) => (
          <MenuItem key={idx} value={data.value}>
            {data.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
