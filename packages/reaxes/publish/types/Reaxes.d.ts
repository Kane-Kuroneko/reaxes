export declare const Reaxes: {
	collectDeps( store: object , propKeys?: ( string | number | symbol )[] ): void;
	obsReaction<T>( callback: ( first: boolean , disposer?: IReactionDisposer ) => T , dependencies: () => Array<any> ): T;
	contrastedCallback<C extends ( ...args: E[] ) => any , F_1 extends () => any[] , E = any>( callback: C , deps: F_1 ): [ ( depsSetter: ( prevDeps: any[] ) => any[] ) => C , () => void ];
};
import { IReactionDisposer } from 'mobx';
