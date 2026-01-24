import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import type { TextInputProps as PaperTextInputProps } from 'react-native-paper';
import type { TextInputProps as RNTextInputProps } from 'react-native';

export type InputProps = Omit<PaperTextInputProps, 'mode'> & {
  error?: boolean;
  autoCapitalize?: RNTextInputProps['autoCapitalize'];
  keyboardType?: RNTextInputProps['keyboardType'];
  autoComplete?: RNTextInputProps['autoComplete'];
  secureTextEntry?: boolean;
};

export function Input({ style, error, autoCapitalize, keyboardType, autoComplete, secureTextEntry, ...props }: InputProps) {
  return (
    <TextInput
      mode="outlined"
      error={error}
      style={[styles.input, style]}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      autoComplete={autoComplete}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
});
