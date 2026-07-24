import React from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBCheckbox,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

// The Filter component takes in props for colors and types, as well as functions to add or remove colors and types
export default function Filter({
  colors,
  addColor,
  removeColor,
  types,
  addType,
  removeType,
}) {
  // An array of color names to be used in the checkboxes
  const colorsVar = [
    "primary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ];
  // An array of color labels to be used in the checkboxes
  const colorsLabels = [
    "Blue",
    "Green",
    "Red",
    "Yellow",
    "Cyan",
    "White",
    "Black",
  ];

  // Function to handle when a color checkbox is clicked
  function colorClicked(color) {
    if (colors.has(color)) {
      removeColor(color);
    } else {
      addColor(color);
    }
  }

  // Function to handle when a type checkbox is clicked
  function typeClicked(type) {
    if (types.has(type)) {
      removeType(type);
    } else {
      addType(type);
    }
  }

  // The Filter component returns a dropdown menu with checkboxes for colors and types, as well as a Clear button
  return (
    <MDBDropdown group>
      <MDBDropdownToggle
        color="link"
        style={{
          color: "#3b82f6",
          backgroundColor: "#111111",
          border: "1px solid #222222",
          borderRadius: "10px",
          padding: "0.6rem 0.9rem",
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          fontWeight: "500",
        }}
      >
        <MDBIcon fas icon="filter" className="me-2" /> Filter
      </MDBDropdownToggle>

      <MDBDropdownMenu
        className="p-3"
        style={{
          minWidth: "200px",
          backgroundColor: "#111111",
          border: "1px solid #222222",
          borderRadius: "10px",
          color: "#ffffff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        }}
      >
        {/* Checkbox for notes */}
        <div className="mb-2 text-white">
          <MDBCheckbox
            id="filter-note"
            checked={types.has("note")}
            onChange={() => typeClicked("note")}
            label="Note"
            labelClass="text-white opacity-85"
          />
        </div>

        {/* Checkbox for to-dos */}
        <div className="mb-2 text-white">
          <MDBCheckbox
            id="filter-todo"
            checked={types.has("todo")}
            onChange={() => typeClicked("todo")}
            label="To Do"
            labelClass="text-white opacity-85"
          />
        </div>

        {/* Divider between types and colors */}
        <MDBDropdownItem
          divider
          style={{ borderColor: "#222222", margin: "0.5rem 0" }}
        />

        {/* Map over the colors array to create checkboxes for each color */}
        {colorsVar.map((color, index) => (
          <div key={index} className="mb-2 text-white">
            <MDBCheckbox
              id={`filter-color-${index}`}
              checked={colors.has(color)}
              onChange={() => colorClicked(color)}
              className={`custom-check-input ${color}`}
              color={color}
              label={colorsLabels[index]}
              labelClass="text-white opacity-85"
            />
          </div>
        ))}

        {/* Clear button to remove all filters */}
        <MDBBtn
          color="danger"
          size="sm"
          rounded
          className="mt-3 w-100"
          onClick={() => {
            colorsVar.forEach((color) => removeColor(color));
            removeType("note");
            removeType("todo");
          }}
        >
          Clear
        </MDBBtn>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}
