/**
 * Checks if the literal type matches the generic parameter T and fixes the type as T.
 * Commonly used to avoid redundant declarations of entity keys and type keys within objects.
 * @example
 * //brefore:
 * const state = {
 *    gender: 'male' satisfies 'male'|'female' as 'male'|'female',
 *    title : 'staff' satisfies Title as Title
 * }
 * 
 * //after:
 * const state = {
 *    gender: checkAs<'male'|'female'>('male'),
 *    title : checkAs<Title>('staff')
 * };
 */
export const checkAs = <T>(r:T):T => r;
