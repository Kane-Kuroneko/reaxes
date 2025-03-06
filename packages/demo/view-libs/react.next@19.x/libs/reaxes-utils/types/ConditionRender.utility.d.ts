/// <reference types="react" />
/// <reference types="react" />
export declare const If: {
    ({ children, condition }: {
        children: any;
        condition: any;
    }): JSX.Element;
    Else: () => any;
};
export declare const Else: () => any;
type Switch = React.FunctionComponent<{
    children: any;
    target: any;
}> & {
    Case: Function;
    Default: Function;
};
export declare const Switch: Switch;
export {};
