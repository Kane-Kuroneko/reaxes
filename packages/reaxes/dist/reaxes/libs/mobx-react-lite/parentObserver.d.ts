/// <reference types="react" />
export declare function useObserver<T>(fn: () => T, baseComponentName: string, instance: any): T;
export interface IObserverOptions {
    readonly forwardRef?: boolean;
}
export declare function parentObserver<P extends object, TRef = {}>(baseComponent: React.ForwardRefRenderFunction<TRef, P> | React.FunctionComponent<P> | React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<TRef>>, options?: IObserverOptions): (props: any, ref: React.Ref<TRef>) => React.ReactElement<any, any>;
