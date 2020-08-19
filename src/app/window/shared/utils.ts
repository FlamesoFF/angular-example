export function clearObject( object: object ) {
    return Object.values(object).reduce(( pV, cV, index, array ) => {
        if ( !cV ) delete array[index];
    }, {})
}