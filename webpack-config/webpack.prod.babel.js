// @flow

import rimraf from 'rimraf';
import path from 'path';
import baseConfig from './webpack.base.babel';
import Dotenv from "dotenv-webpack";

export default (env : any) => {
    if (env.NODE_ENV === 'production') {
        rimraf(path.join(__dirname, '../../dist'), {}, () => {
            console.log('Dist folder removed successfully');
        });
    }
    return {
        ...baseConfig,
        plugins: [
            ...baseConfig.plugins,
            new Dotenv({
                path: path.resolve(__dirname, '../../prod.env'),
            }),
        ],
    };
};
