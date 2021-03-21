/* eslint-disable no-unused-expressions */
import { Themes } from 'assets/themes';
import React from 'react';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
    ColorValue,
    ReturnKeyTypeOptions,
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText } from '.';

interface FormInputProps extends TextInputProps {
    name: string;
    rules?: RegisterOptions;
    defaultValue?: string;
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
    customStyle?: StyleProp<TextStyle>;
    customLabelStyle?: StyleProp<TextStyle>;
    customErrorStyle?: StyleProp<TextStyle>;
    customPlaceHolder?: string;
    placeholderTextColor?: ColorValue;
    customUnderlineColor?: ColorValue;
    customReturnKeyType?: ReturnKeyTypeOptions;
}

const StyledInputForm = React.forwardRef((props: FormInputProps, ref: any) => {
    const {
        name,
        rules,
        defaultValue = '',
        label,
        containerStyle,
        customStyle,
        customLabelStyle,
        customErrorStyle,
        onChangeText,
        onBlur,
        ...inputProps
    } = props;
    const formContext = useFormContext();
    const { control, errors } = formContext;
    const { field } = useController({ name, control, rules, defaultValue });
    const { t } = useTranslation();
    const errorMessage = errors[name]?.message || '';

    const onChangeTextInput = (text: string) => {
        onChangeText ? onChangeText(text) : field.onChange(text);
    };
    const onBlurInput = (data: any) => {
        onBlur ? onBlur(data) : field.onBlur();
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {!!label && <StyledText customStyle={[styles.label, customLabelStyle]} i18nText={label} />}
            <TextInput
                ref={ref}
                value={field.value}
                onChangeText={onChangeTextInput}
                onBlur={onBlurInput}
                style={[styles.textInput, customStyle]}
                placeholderTextColor={props.placeholderTextColor || Themes.COLORS.textSecondary}
                placeholder={props.customPlaceHolder ? t(props.customPlaceHolder) : ''}
                underlineColorAndroid={props?.customUnderlineColor || 'transparent'}
                importantForAutofill="yes"
                autoCorrect={false}
                returnKeyType={props.customReturnKeyType || 'next'}
                blurOnSubmit={!!props.customReturnKeyType}
                {...inputProps}
            />
            {!!errorMessage && (
                <StyledText customStyle={[styles.textError, customErrorStyle]} i18nText={errorMessage} />
            )}
        </View>
    );
});

const styles = ScaledSheet.create({
    container: {
        marginVertical: '5@vs',
    },
    label: {
        fontSize: '12@ms',
    },
    textError: {
        color: 'red',
        fontSize: '12@ms',
    },
    textInput: {
        width: '300@s',
        padding: 2,
        borderWidth: 0.5,
        paddingHorizontal: '10@s',
        paddingVertical: '10@vs',
        borderColor: 'black',
        borderRadius: 5,
        marginBottom: '5@vs',
    },
});

export default StyledInputForm;
