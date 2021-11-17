import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { Container } from "./styles";
import { Input } from "../Input";

// type Props = TextInputProps;
interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export const InputForm: React.FC<Props> = ({ control, name, ...rest }) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
    </Container>
  );
};

export default Input;
