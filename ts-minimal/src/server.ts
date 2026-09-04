'use strict';
import {StatePromulgator} from '@bundle-of-tubes/state-promulgator';

interface PaginatorState {
  skip: number;
  take: number;
  pageSize: number;
  totalRows: number;
}
const stateMachine = new StatePromulgator<PaginatorState>({skip: 0, take: 0, pageSize: 20, totalRows: 0});
const pageNumberKey: symbol = stateMachine.registerCallback((newState: PaginatorState, oldState: PaginatorState, dependencies: Map<symbol,any>)=>{
  const skip = newState.skip as number;
  const pageSize = newState.pageSize as number;
  return Math.floor(skip/pageSize)+1;
}, new Set(), new Set());
stateMachine.registerCallback((newState: PaginatorState, oldState: PaginatorState, dependencies: Map<symbol, any>)=>{
  const pageNumber = dependencies.get(pageNumberKey) as number;
  console.log('current page is', pageNumber);
}, ['skip', 'take'], [pageNumberKey]);
stateMachine.updateState({totalRows: 32});
stateMachine.updateState({skip: 20, take: 12});
stateMachine.updateState({pageSize: 10, take: 10});
