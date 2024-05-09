import { useState } from "react";

const useField = (label) => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event?.target.value);
  const reset = () => setValue('');
  // Sets the title as the label content with the first letter as upper-case and the rest lower case.
  const title = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
  const placeholder = `Enter ${title}`;

  return {
    name: title,
    value,
    onChange,
    placeholder,
    reset,
  };
};

export default useField;