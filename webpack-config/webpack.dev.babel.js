// @flow

import path from 'path';
import Dotenv from 'dotenv-webpack';
import baseConfig from './webpack.base.babel';

export default (env : any) => ({
    ...baseConfig,
    plugins: [
        ...baseConfig.plugins,
        new Dotenv({
            path: path.resolve(__dirname, '../../dev.env'),
        }),
    ],
});
