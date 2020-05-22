import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [add, setAdd] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  // Make a put request to save your updated color
  // think about where will you get the id from...
  // where is is saved right now?
  const saveEdit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((response) => {
        console.log('Response from PUT request ColorList', response);
        updateColors(response.data);
        setEditing(false);
      })
      .catch((error) => console.log('Error from ColorList', error));
  };

  // make a delete request to delete this color
  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((response) => {
        console.log('Response from DELETE axios ColorList', response);
        updateColors(
          colors.filter((item) => {
            return item.color !== color.id && item.code.hex !== color.code.hex;
          })
        );
      })
      .catch((error) => {
        console.log('Error from DELETE request ColorList', error);
      });
  };

  const addNewColor = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post(`/api/colors/`, colorToAdd)
      .then((response) => {
        console.log('Response from add new color post ColorList', response);
        updateColors(response.data);
        setEditing(false);
      })
      .catch((error) => console.log('Error from post adding new color', error));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
          <button
            onClick={() => {
              setEditing(true);
            }}
          >
            Add A New Color
          </button>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {add && (
        <form onSubmit={addNewColor}>
          <legend>Add A Color</legend>
          <label>
            New Color Name:
            <input
              type="text"
              name="color"
              value={colorToAdd.color}
              placeholder="Enter New Color Here"
              onChange={(event) =>
                setColorToAdd({ ...colorToAdd, color: event.target.value })
              }
            />
          </label>
          <label>
            Hex Code Here:
            <input
              type="text"
              name="hexCode"
              value={colorToAdd.code}
              onChange={(event) =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: event.target.value },
                })
              }
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAdd(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
