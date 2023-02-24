import { Form } from "react-bootstrap";

const FilterOrder = ({ setFilterOrder }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterOrder(value);
  };

  return (
    <div className="d-flex justify-content-start align-items-center">
      <div className={``}>
        <span className={`pe-3`}>Ordenar por: </span>
      </div>
      <div>
        <Form.Select
          aria-label="Default select example"
          onChange={handleChange}
        >
          <option value="0">Mas Nuevo</option>
          <option value="1">Mayor Precio</option>
          <option value="2">Menor Precio</option>
          <option value="3">A-Z</option>
          <option value="4">Z-A</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default FilterOrder;
