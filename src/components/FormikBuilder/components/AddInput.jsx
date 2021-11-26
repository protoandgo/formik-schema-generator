import React, { useState, useRef } from "react";
import { Tag, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

// saveInputRef = (input) => { ///////falta!!!!
//   this.input = input;
// };

// saveEditInputRef = (input) => {///FAlta!!!
//   this.editInput = input;
// };

const tagsInitialvalue = [""];
const AddInput = () => {
  // LOTS OF STATES
  const [tags, setTags] = useState(tagsInitialvalue);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  //const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  // const SaveInputRef = (ref) => {
  //   inputRef = ref;
  // }

  // const SaveEditInputRef = (ref) => {
  //   editInputRef = ref;
  // }

  //LOTS OF HANDLERS
  const handleClose = (removedTag) => {
    const allTags = tags.filter((tag) => tag !== removedTag);
    console.log(allTags);
    setTags(allTags);
  };

  //HANDLE NEW INPUT
  const handleInputChange = (e) => {
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
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
    console.log("handleEditInputChange!!");
  };

  const handleEditInputConfirm = () => {
    //this.setState(({ tags, editInputIndex, editInputValue }) => {
    console.log("handleEditInputConfirm!!");
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;

    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
    //return {
    //  tags: newTags,
    //  editInputIndex: -1,
    //  editInputValue: '',
    //};
    // });
  };

  //HANDLE OTHER THINGS THAT HAD TO BE HANDLED

  const handleShowInput = () => {
    setInputVisible({ inputVisible: true }, () => inputVisible.focus());
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

                    editInputRef.current.focus();
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

//const isLongTag = tag.length > 20;

//   const tagElem = (
//     <Tag
//       className="edit-tag"
//       key={tag}
//       closable={index !== 0}
//       onClose={() => handleClose(tag)}
//     >
//       <span
//         onDoubleClick={e => {
//           if (index !== 0) {
//             setState({ editInputIndex: index, editInputValue: tag }, () => {
//               editInput.focus();
//             });
//             e.preventDefault();
//           }
//         }}
//       >
//         {isLongTag ? `${tag.slice(0, 20)}...` : tag}
//       </span>
//     </Tag>
//   );
//   return isLongTag ? (
//     <Tooltip title={tag} key={tag}>
//       {tagElem}
//     </Tooltip>
//   ) : (
//     tagElem
//   );

export default AddInput;
