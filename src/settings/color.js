import {Appearance} from 'react-native';

export const globalButtonColor = '#ECCA1B';
export const globalBackgroundColor = globalButtonColor;
export const globalBlackColor = '#2c2c2c';

const colorScheme = Appearance.getColorScheme();
/*if (colorScheme === 'dark') {
    // Use dark color scheme
    //alert('dark');
} else {
    //alert('others');
}*/

export const dynamicGlobalTextColor = (colorScheme === 'dark') ? '#262626' : '#ffffff';
export const dynamicGlobalBackgroundColor = (colorScheme === 'dark') ? '#f6f6f6' : '#1f1f1f';


