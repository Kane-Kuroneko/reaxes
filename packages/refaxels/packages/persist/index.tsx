/**
 *
 */

const encrypt = new JSEncrypt({default_key_size: 2048});

encrypt.getKey();

encrypt.getPublicKey();
encrypt.getPrivateKey();

const decrypt = new JSEncrypt();
decrypt.setPrivateKey('');


export class RefaxelPersist {
	
	storage : Storage = null;
	
	registeredKeys:string[] = [];
	
	store : object = null;
	
	constructor(store:object,key:string|Symbol,) {
		if(!this.storage){
			throw new Error( 'RefaxelPersist must be extended by a class with a storage property' );
		}
		if(!key){
			throw new Error( `${ key } is not a valid persist key` );
		}
		
		this.store = store;
		
		
		
		const storageKey = {
			'string' : '',
			'symbol' : ''
		}[typeof key];
	}
	
	recoverStoreFromStorage = () => {
		
		
	}
	
	encryptStoreKey = (key) => {
		
	}
	
	decryptStoreKey = () => {
		
	}
}




export class RefaxelLocalStoragePersist extends RefaxelPersist{
	
	storage = localStorage;
	
	constructor(store:object,key:string|Symbol,) {
		super(store,key);
	}
	
}

export class RefaxelSessionStoragePersist extends RefaxelPersist{
	
	storage = sessionStorage;
	
	constructor(store:object,key:string|Symbol,) {
		super(store,key);
	}
	
}

import { deepObserve } from 'mobx-utils';
import { JSEncrypt } from 'jsencrypt';
