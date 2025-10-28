// file - Central entry point that bundles all services together for easy import.
import * as keyboards from './keyboards';
import * as switches from './switches';
import * as colors from './colors';
import * as cart from './cart';

export const Api = {
    keyboards,
    switches,
    colors,
    cart
};