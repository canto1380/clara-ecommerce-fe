import { useState, useEffect } from "react";
import { Form, Nav } from "react-bootstrap";
import styles from "./footwearType.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
const FilterMenu = ({
  setFilterColor,
  filterColor,
  filterSize,
  setFilterSize,
  data,
}) => {
  const [activeBand, setActiveband] = useState(0);

  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  let arrayColor = filterColor;
  let arraySize = filterSize;

  const addColorOptions = () => {
    // let array = [];
    let colorr = [];
    const colors = data.map((c) => {
      const arrayColor = c?.idColor;
      for (let color of arrayColor) {
        // array.push(color?.colorName);
        colorr.push({
          id: color?._id,
          name: color?.colorName,
          code: color?.colorCode,
        });
      }
    });
    // for (let i = array.length - 1; i >= 0; i--) {
    //   if (array.indexOf(array[i]) !== i) array.splice(i, 1);
    // }
    let set = new Set(colorr.map(JSON.stringify));
    colorr = Array.from(set).map(JSON.parse);
    setColorOptions(colorr);
  };

  const addSizeOptions = () => {
    let array = [];
    data.map((s) => {
      const arraySize = s?.size;
      for (let size of arraySize) {
        array.push(size);
      }
    });
    for (let i = array.length - 1; i >= 0; i--) {
      if (array.indexOf(array[i]) !== i) array.splice(i, 1);
    }
    array.sort((a, b) => a - b);

    setSizeOptions(array);
  };

  const changeFilterColor = (e) => {
    const { name, value, checked } = e.target;
    switch (checked) {
      case true:
        // arrayColor.push(value);
        setFilterColor(value);
        break;
      case false:
        // arrayColor = arrayColor.filter((c) => c !== value);
        setFilterColor("");
        break;
    }
  };

  const handleFilterSize = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      arraySize.push(value);
      setFilterSize(arraySize);
    } else {
      arraySize = arraySize.filter((s) => s != value);
      setFilterSize(arraySize);
    }
    // switch (checked) {
    //   case true:
    //     arraySize.push(value);
    //     setFilterSize(arraySize);
    //     break;
    //   case false:
    //     arraySize = arraySize.filter((s) => s != value);
    //     setFilterSize(arraySize);
    //     break;
    // }
  };

  useEffect(() => {
    addColorOptions();
    addSizeOptions();
  }, [data]);

  return (
    <div className={``}>
      <Nav
        className={`${styles.navbarSecondary} ${styles.alignItems}`}
        activeKey="/home"
      >
        <Nav.Item className={`${styles.productItems}`}>
          <Nav.Link
            onClick={() => setActiveband(1)}
            className={`${styles.textPrincipal} ${
              activeBand === 1 ? `${styles.btnActive}` : ``
            }`}
            eventKey="link-1"
          >
            Color
            {<IoMdArrowDropdown className={styles.sizeIcon} />}
          </Nav.Link>
          <div className={`${styles.productItemsPosition}`}>
            <ul className={`${styles.nav}`}>
              {colorOptions.map((c, i) => (
                <div key={i} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={c.id}
                    name="color"
                    onChange={changeFilterColor}
                    id="flexCheckDefault"
                    style={{
                      backgroundColor: `${c.code}`,
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {c.name}
                  </label>
                </div>
              ))}
            </ul>
          </div>
        </Nav.Item>
        <Nav.Item className={`${styles.productItems}`}>
          <Nav.Link
            onClick={() => setActiveband(1)}
            className={`${styles.textPrincipal} ${
              activeBand === 1 ? `${styles.btnActive}` : ``
            }`}
            eventKey="link-1"
          >
            Talle
            {<IoMdArrowDropdown className={styles.sizeIcon} />}
          </Nav.Link>
          <div className={`${styles.productItemsPosition}`}>
            <ul className={`${styles.nav}`}>
              {sizeOptions.map((s, i) => (
                <Form.Check
                  inline
                  key={i}
                  type="checkbox"
                  id="inline-checkbox"
                  label={s}
                  name="talle"
                  value={s}
                  onChange={(e) => handleFilterSize(e)}
                />
              ))}
            </ul>
          </div>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default FilterMenu;
