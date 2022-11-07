import { Button as BtnNativeBase, Text, IButtonProps } from 'native-base'

interface ButtonProps extends IButtonProps {
    title: string
    type?: 'primary' | 'secondary'
}

function Button({ title, type = 'primary', ...rest }: ButtonProps) {

    return (
        <>
            <BtnNativeBase
                w='full'
                h='14'
                textTransform={'uppercase'}
                bg={type === 'secondary' ? 'red.500' : 'yellow.500'}
                _pressed={{
                    bg: type === 'secondary' ? 'red.600' : 'yellow.600'
                }}
                _loading={{
                    _spinner: { color: 'black' }
                }}
                {...rest}>
                <Text
                    fontSize={'sm'}
                    fontFamily={'heading'}
                    color={type === 'secondary' ? 'white':'black'}
                >
                    {title}
                </Text>
            </BtnNativeBase>
        </>
    );
}

export default Button;