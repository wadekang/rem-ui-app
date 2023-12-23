
export const colors = [
    "#FAEDCB", "#C9E4DE", "#C6DEF1", "#DBCDF0", "#F2C6DE", "#F7D9C4",
    "#FFADAD", "#FFD6A5", "#FDFFB6", "#E4F1EE", "#D9EDF8", "#DEDAF4",
    "#FD8A8A", "#FFCBCB", "#9EA1D4", "#F1F7B5", "#A8D1D1", "#DFEBEB",
    "#CCD5AE", "#E9EDC9", "#E7F1DC", "#FEFAE0", "#E3E7A0", "#B5C1B2"
];

export const fontColorMap = {
    '#faedcb': '#695C5C',
    '#c9e4de': '#505050',
    '#c6def1': '#505050',
    '#dbcdf0': '#504646',
    '#f2c6de': '#505050',
    '#f7d9c4': '#505050',

    '#ffadad': '#505050',
    '#ffd6a5': '#505050',
    '#fdffb6': '#696969',
    '#e4f1ee': '#696969',
    '#d9edf8': '#695C5C',
    '#dedaf4': '#505050',

    '#fd8a8a': '#373737',
    '#ffcbcb': '#504646',
    '#9ea1d4': '#222321',
    '#f1f7b5': '#695C5C',
    '#a8d1d1': '#504646',
    '#dfebeb': '#695454',

    '#ccd5ae': '#504646',
    '#e9edc9': '#695454',
    '#e7f1dc': '#695C5C',
    '#fefae0': '#695C5C',
    '#e3e7a0': '#505050',
    '#b5c1b2': '#373737',

    'default': '#373737'
};

export const getEventColor = (color) => {
    return fontColorMap[color] || fontColorMap['default'];
}