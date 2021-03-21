import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { regexEmail } from 'utilities/validate';

const DEFAULT_VALUE = {
    username: 'test',
    email: 'test@test.com',
    password: '12345678',
    confirmPassword: '12345678',
};

const AccountView = () => {
    const form = useForm({
        mode: 'onChange', // validate form onChange
        defaultValues: DEFAULT_VALUE,
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        reset,
        handleSubmit,
    } = form;

    const onSubmit = (formData: any) => {
        AlertMessage(JSON.stringify(formData), 'Form Data');
    };
    const onChangeUsername = (text: string) => {
        form.setValue('username', text.length === 12 ? 'Custom onChangeText' : text, {
            shouldValidate: true, // validate when set value
        });
    };
    const validateConfirmPassword = (value: string) => {
        return value === form.watch('password') || 'Password do not match';
    };
    return (
        <View style={styles.container}>
            <FormProvider {...form}>
                <StyledInputForm
                    name={'username'}
                    label="Username"
                    rules={{ required: 'Username is required.' }}
                    returnKeyType="next"
                    onChangeText={onChangeUsername}
                />
                <StyledInputForm
                    name={'email'}
                    label="Email"
                    rules={{
                        pattern: {
                            value: regexEmail,
                            message: 'Invalid Email.',
                        },
                    }}
                />
                <StyledInputForm
                    secureTextEntry={true}
                    name={'password'}
                    label="Password"
                    rules={{
                        maxLength: {
                            message: 'The maximum length is 15.',
                            value: 15,
                        },
                        minLength: {
                            message: 'The minimum length is 6.',
                            value: 6,
                        },
                        required: 'Password is required.',
                    }}
                />
                <StyledInputForm
                    name={'confirmPassword'}
                    label="Confirm Password"
                    rules={{
                        required: 'Confirm Password is required.',
                        validate: validateConfirmPassword,
                    }}
                    secureTextEntry={true}
                />
            </FormProvider>
            <StyledTouchable
                onPress={handleSubmit(onSubmit)}
                customStyle={[styles.button, !isValid && { backgroundColor: 'gray' }]}
                disabled={!isValid}
            >
                <StyledText i18nText={'Submit'} customStyle={styles.textButton} />
            </StyledTouchable>
            <StyledTouchable onPress={() => reset()} customStyle={styles.button}>
                <StyledText i18nText={'Reset'} customStyle={styles.textButton} />
            </StyledTouchable>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
    },
    button: {
        width: '150@s',
        marginTop: 5,
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
});

export default AccountView;
