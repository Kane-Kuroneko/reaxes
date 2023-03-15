import {repo} from './entrance.mjs';
import {webpackBaseConfig} from './webpack.base.config.mjs';
import { merge } from "webpack-merge";


const repoPartialWebpackConfig = (await import(`../packages/${repo}/webpack.partial.mjs`)).webpackConfig;

export const webpackConfigWithRepo = merge(webpackBaseConfig , repoPartialWebpackConfig);
