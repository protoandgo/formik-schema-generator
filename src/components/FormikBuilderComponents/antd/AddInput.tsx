import React, { useState, useRef } from "react";
import { Tag, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { CommonInputProps } from "../../FormikBuilder2/utils/types";



const tagsInitialvalue :string[]= [];


export const AddInput = ({
  field: { name, onChange, value },
  meta,
  setFieldValue,
  ...props
}: CommonInputProps) => {
  // STATES
  const [tags, setTags] = useState(tagsInitialvalue);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const inputRef = useRef<Input>(null);
  const editInputRef = useRef<Input>(null);

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

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      console.log("handleInputConfirm!!");
    }
    console.log(tags);
    setInputVisible(false);
    setInputValue("");
  };

  //HANDLE EDIT INPUTS THAT ALREADY EXIST
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
    console.log("handleEditInputChange!!");
  };

  const handleEditInputConfirm = () => {
    console.log("handleEditInputConfirm!!");
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;

    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const handleShowInput = async () => {
    setInputVisible(true);
    await setInputValue("");

    inputRef.current?.focus();
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
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        // SI NO ...
        // MUESTRA EL TAG, DEJANDO QUE HAGAS DOBLE CLICK PARA EDITAR
        return (
          <>
            <Tag
              className="edit-tag"
              key={tag}
              closable={index !== 0}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={async (e) => {
                  if (index !== 0) {
                    console.log(editInputRef);
                    await setEditInputIndex(index);
                    await setEditInputValue(tag);

                    editInputRef.current?.focus();

                    e.preventDefault();
                  }
                }}
              >
                {tag}
              </span>
            </Tag>
          </>
        );
      })}
      {/* INSERTAR NUEVO TAG: UN Tag Y UN Input */}
      {/* SI ESTAS INSERTANDO UN NUEVO TAG, MOSTRAR EL INPUT */}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {/* SI NO, MOSTRAR UN TAG CON EL TEXTO "+ New Tag" QUE, AL CLICARLE, TE DEJA INSERTAR UNO NUEVO */}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={handleShowInput}>
          <PlusCircleOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};


