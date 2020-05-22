import React, { useState } from 'react';
import axios from 'axios';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  // Make a put request to save your updated color
  // think about where will you get the id from...
  // where is is saved right now?
  const saveEdit = (event) => {
    event.preventDefault();
    axios
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
    axios
      .delete(`http://localhost:5000/api/colors/${color.id}`)
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
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
