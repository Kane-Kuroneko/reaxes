/// <reference types="react" />
import { Reaction } from "mobx";
export declare function createTrackingData(reaction: Reaction): IReactionTracking;
export interface ReactionCleanupTracking {
    addReactionToTrack(reactionTrackingRef: React.MutableRefObject<IReactionTracking | null>, reaction: Reaction, objectRetainedByReact: object): IReactionTracking;
    recordReactionAsCommitted(reactionRef: React.MutableRefObject<IReactionTracking | null>): void;
    forceCleanupTimerToRunNowForTests(): void;
    resetCleanupScheduleForTests(): void;
}
export interface IReactionTracking {
    reaction: Reaction;
    cleanAt: number;
    mounted: boolean;
    changedBeforeMount: boolean;
    finalizationRegistryCleanupToken?: number;
}
export declare const CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS = 10000;
export declare const CLEANUP_TIMER_LOOP_MILLIS = 10000;
