import { Input } from "@chakra-ui/input";
import React, { FC, useState } from "react";

import styles from "../styles/ChoicesInput.module.scss";

interface IProps {
  onChange: (choices: string[]) => void;
}

const ChoicesInput: FC<IProps> = (props) => {
  const { onChange } = props;

  const [values, setValues] = useState<string[]>([]);

  // update from bottom
  const handleChange = (index: number, value: string) => {
    setValues((oldValue) => {
      const temp = oldValue;
      temp[index] = value;
      onChange(temp.filter((a) => !!a));
      return temp.filter((a) => !!a);
    });
  };

  return (
    <>
      {values.map((v, i) => (
        <Input
          className={styles.input}
          value={values[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          key={i}
          autoFocus={i === values.length - 1}
          size="sm"
          variant="filled"
          bg="brand.lighter"
          _hover={{ bg: "brand.base" }}
        />
      ))}
      <Input
        value={values[values.length + 1]}
        onChange={(e) => handleChange(values.length, e.target.value)}
        key={values.length + 1}
        size="sm"
        _hover={{ bg: "brand.base" }}
        placeholder="Ajouter un choix..."
      />
    </>
  );
};

export default ChoicesInput;
