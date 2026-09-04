'use strict';
import {StatePromulgator} from '@bundle-of-tubes/state-promulgator';

const stateMachine = new StatePromulgator({message: 'message', value: 0});
const k = stateMachine.registerCallback((newState, oldState, dependencies)=>{
  return newState.value + oldState.value;
}, new Set(), new Set());
stateMachine.registerCallback((newState, oldState, dependencies)=>{
  console.log('message changed from ', oldState.message, 'to ', newState.message);
  console.log('callback1 returned: ', dependencies.get(k));
}, new Set(['value']), new Set([k]));

stateMachine.updateState({message: 'unwatched'}); //no callbacks are triggered because value is omitted, and value will be unchanged
stateMachine.updateState({message: 'identical', value: 0}); //no callbacks are triggered because value is unchanged
stateMachine.updateState({message: 'identical', value: 0}, true); //callbacks are triggered because of the promulgateUnchangedProperties flag
stateMachine.updateState({message: 'fibonacci', value: 1}); //callbacks are triggered because value is changed
