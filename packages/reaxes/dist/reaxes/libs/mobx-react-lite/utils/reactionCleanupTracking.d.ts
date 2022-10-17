/// <reference types="react" />
export type { IReactionTracking } from "./reactionCleanupTrackingCommon";
declare const addReactionToTrack: (reactionTrackingRef: React.MutableRefObject<import("./reactionCleanupTrackingCommon").IReactionTracking>, reaction: import("mobx").Reaction, objectRetainedByReact: object) => import("./reactionCleanupTrackingCommon").IReactionTracking, recordReactionAsCommitted: (reactionRef: React.MutableRefObject<import("./reactionCleanupTrackingCommon").IReactionTracking>) => void, resetCleanupScheduleForTests: () => void, forceCleanupTimerToRunNowForTests: () => void;
export { addReactionToTrack, recordReactionAsCommitted, resetCleanupScheduleForTests, forceCleanupTimerToRunNowForTests };
