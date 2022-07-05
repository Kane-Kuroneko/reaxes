import { Component } from 'react';
import { reaction } from 'mobx';


export class ReactComponentClass<Tprops extends {} = any , Tstate extends {} = any> extends Component<Tprops , Tstate> {
	
	#generateQueueID = function () {
		let id = 0;
		return ( callback : () => any ):{callback():any,id:string} => (
			{
				callback ,
				id : (id++).toString(),
			}
		);
	}();
	
	JSX : { [ p : string ] : () => React.ReactElement | void | React.ReactNode };
	
	actions : { [ p : string ] : Function };
	
	mountedStack:{callback():any,id:string}[] = [];
	
	unmountStack:{callback():any,id:string}[] = [];
	
	updatedStack:{callback():any,id:string}[] = [];
	
	renderedStack:{callback():any,id:string}[] = [];
	
	lifecycle:Lifecycle = {
		/**
		 * 只执行某些生命周期
		 */
		_only (props){
			return _.pick(this,props);
		},
		/**
		 * 不执行某些生命周期
		 */
		_omit(props){
			
		},
		
		unregister : (id) => {
			_.remove(this.mountedStack,(value) => value.id === id);
			_.remove(this.unmountStack,(value) => value.id === id);
			_.remove(this.updatedStack,(value) => value.id === id);
			_.remove(this.renderedStack,(value) => value.id === id);
		} ,
		
		mounted : ( cb : () => any ):string => {
			const cbObj = this.#generateQueueID( cb );
			this.mountedStack.push( cbObj );
			return cbObj.id;
		} ,
		unmount : ( cb : () => any ) => {
			const cbObj = this.#generateQueueID( cb );
			this.unmountStack.push( cbObj );
			return cbObj.id;
		} ,
		updated : ( cb : () => any ) => {
			const cbObj = this.#generateQueueID( cb );
			this.updatedStack.push( cbObj );
			return cbObj.id;
		} ,
		rendered : ( cb : () => any ) => {
			const cbObj = this.#generateQueueID( cb );
			this.renderedStack.push( cbObj );
			return cbObj.id;
		} ,
		/**
		 * completed
		 * 当每次渲染后触发的副作用,自动比对deps变化触发
		 * 触发时机:componentDidRender
		 */
		effect : (cb : () => any , deps : () => any[] ) : string => {
			let prevDeps = deps();
			let firstflag = true;
			const fn = () => {
				const currentDeps = deps();
				if(firstflag){
					return cb(),firstflag = false,void 0;
				}
				if(!utils.default.shallowEqual(prevDeps,currentDeps)){
					return cb(),prevDeps = currentDeps,void 0;
				}
			};
			const cbObj = this.#generateQueueID( fn );
			this.updatedStack.push( cbObj );
			this.mountedStack.push( cbObj );
			return cbObj.id;
		},
		/**
		 * 实验性功能:监听deps变化自动触发计算
		 */
		memory<F extends ( first : boolean ) => any>( callback : F , dependencies ) : ReturnType<F> {
			let depList = dependencies();
			reaction( dependencies , ( data , reaction ) => {
				const dataChanged = !utils.default.shallowEqual( data , depList );
				console.log( dataChanged );
				if ( dataChanged ) {
					crayon.orange( 'data changed' );
					callback( false );
					depList = data;
				} else {
					crayon.red( 'reaction called but data not changed' );
				}
				
			} );
			
			return callback( true );
		} ,
	};
	
	/**
	 * didMount和didUpdate都要执行的函数,何不放在这里?
	 */
	componentDidRender?( stage : "mount" | "update" , prevProps? : Readonly<Tprops> , prevState? : Readonly<Tstate> , snapshot? : any ) : any;
	
};

