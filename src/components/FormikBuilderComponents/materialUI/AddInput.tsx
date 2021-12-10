import React, { useRef, useState } from "react";
// MUI IMPORTS 
import { Box } from "@mui/system";
import { Stack, Typography, Chip, TextField, TextFieldProps } from "@mui/material";
import { Cancel } from '@mui/icons-material';
// PROPS
import { componentCommonProps } from "../../FormikBuilder/utils/types";

const Tags = ({data, handleDelete}) => {
  return (
    <Box
      sx={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction='row' gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => handleDelete(data)}
        />
      </Stack>
    </Box>
  );
};


const tagsInitialValue :string[]= [];

export const AddInput = ({
  fieldInfo, // label, options, rows, etc
  inputProps, // formik's FieldInputProps (name, value, checked, onBlur) and disabled
  meta, // touched, error
  setFieldValue, // to use on handleChange
}: componentCommonProps) => {
  
  const tagRef = useRef<TextFieldProps>(null);
  const [tags, setTags] = useState([]);

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };
 
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setTags([...tags, tagRef.current.value]);
    tagRef.current.value=''
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleOnSubmit}>
      <TextField
        inputRef={tagRef}
        fullWidth
        variant="standard"
        size="small"
        sx={{ margin: "1rem 0" }}
        margin="none"
        placeholder="Enter Tags here"
        InputProps={{
          startAdornment: (
            <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
              {tags.map((data, index) => {
                return (
                  <Tags data={data} handleDelete={handleDelete} key={index} />
                );
              })}
            </Box>
          ),
        }}
      />
      </form>
    </Box>
  );
};
