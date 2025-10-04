import { TextField } from "@mui/material";

const FormRenderer = ({ fields, values, onChange }) => (
  <>
    {fields.map((field) => (
      <TextField
        key={field.name}
        type={field.type}
        label={field.placeholder}
        value={values[field.name]}
        onChange={(e) => onChange(field.name, e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
    ))}
  </>
);

export default FormRenderer;
