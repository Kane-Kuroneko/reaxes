
export const useReaxable = <S extends object>( state : S ) => useRef( (createReaxable as CreateReaxable)( state ) ).current;

import { createReaxable , type CreateReaxable} from 'reaxes';
import type {NestedMutate,NestedSetState,ResurivePartial} from 'reaxes';
import { useRef } from 'react';
