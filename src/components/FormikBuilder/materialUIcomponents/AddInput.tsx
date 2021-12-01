import React, { useState, useRef } from "react";
//import { Tag, Input } from "antd";
import Chip from "@mui/material/Chip";

//import { PlusCircleOutlined } from "@ant-design/icons";
import { GenericInputComponentProps } from "../utils/types";
import { TextField, TextFieldProps } from "@mui/material";
import { Icon } from "@mui/material";

const tagsInitialvalue = [""];
interface AddInputProps extends GenericInputComponentProps {}

const AddInput = (props: AddInputProps) => {
  const meta = props.meta;
  // STATES
  const [tags, setTags] = useState(tagsInitialvalue);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const inputRef = useRef<TextFieldProps>(null);
  const editInputRef = useRef<TextFieldProps>(null);

  // HANDLERS
  const handleClose = (removedTag: string) => {
    const allTags = tags.filter((tag) => tag !== removedTag);
    console.log(allTags);
    setTags(allTags);
  };
  
  //HANDLE NEW INPUT
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log("handleInputChange!!");
  };

  const handleInputConfirm = (e: any) => {
    if (e.key === '13') {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        setTags([...tags, inputValue]);
        console.log("handleInputConfirm!!");
      }
      console.log(tags);
      setInputVisible(false);
      setInputValue("");
    }
  };

  //HANDLE EDIT INPUTS THAT ALREADY EXIST
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
    console.log("handleEditInputChange!!");
  };

  const handleEditInputConfirm = (e:any) => {
    if (e.key === '13') {
      console.log("handleEditInputConfirm!!");
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      setTags(newTags);
      setEditInputIndex(-1);
      setEditInputValue("");
    }
  };

  const handleShowInput = async () => {
    setInputVisible(true);
    await setInputValue("");

    //inputRef?.focus();
    //() => inputVisible.focus()
  };



  return (
    <>
      {/* POR CADA TAG (MOSTRAR Y EDITAR CADA UNO): UN Tag Y UN Input POR CADA UNO */}
      {tags.map((tag, index) => {
        // SI EL TAG A MOSTRAR ES EL QUE ESTAS EDITANDO ...
        if (editInputIndex === index) {
          // MUESTRA EL INPUT
          return (
            <TextField
              inputRef={(input) => input && input.focus()}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onKeyDown={handleEditInputConfirm}
            />
          );
        }
        // SI NO ...
        // MUESTRA EL TAG, DEJANDO QUE HAGAS DOBLE CLICK PARA EDITAR
        return (
          <>
            <Chip
              className="edit-tag"
              key={tag}
              onDelete={index !== 0 ? handleClose : undefined}
              // closable={index !== 0}
              // onClose={() => handleClose(tag)}
              label={tag}
              onDoubleClick={async (e) => {
                if (index !== 0) {
                  console.log(editInputRef);
                  await setEditInputIndex(index);
                  await setEditInputValue(tag);

                  //editInputRef.current?.focus();

                  e.preventDefault();
                }
              }}
            />
          </>
        );
      })}
      {/* INSERTAR NUEVO TAG: UN Tag Y UN Input */}
      {/* SI ESTAS INSERTANDO UN NUEVO TAG, MOSTRAR EL INPUT */}
      {inputVisible && (
        <TextField
          inputRef={(input) => input && input.focus()}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onKeyDown={handleInputConfirm}
        />
      )}
      {/* SI NO, MOSTRAR UN TAG CON EL TEXTO "+ New Tag" QUE, AL CLICARLE, TE DEJA INSERTAR UNO NUEVO */}
      {!inputVisible && (
        <Chip
          className="site-tag-plus"
          onClick={handleShowInput}
          icon={<Icon>add_circle</Icon>}
          label="New Tag"
        />
      )}
    </>
  );
};

export default AddInput;
