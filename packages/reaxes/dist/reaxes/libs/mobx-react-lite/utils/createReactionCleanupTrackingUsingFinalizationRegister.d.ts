import { FinalizationRegistry as FinalizationRegistryMaybeUndefined } from "./FinalizationRegistryWrapper";
import { ReactionCleanupTracking } from "./reactionCleanupTrackingCommon";
export declare function createReactionCleanupTrackingUsingFinalizationRegister(FinalizationRegistry: NonNullable<typeof FinalizationRegistryMaybeUndefined>): ReactionCleanupTracking;
