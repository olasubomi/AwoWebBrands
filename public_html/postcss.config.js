import postcss from 'postcss';
import cssnano from 'cssnano';
module.exports = {
    plugins: [
        require('cssnano')({
            preset: 'default',
        }),
    ],
};