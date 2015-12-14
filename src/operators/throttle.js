import stream from '../stream.js';

export default function throttle ( source, ms = 250 ) {
	const destination = stream();

	let blocked = false;

	source.subscribe( value => {
		if ( blocked ) return;
		blocked = true;

		destination.push( value );
		setTimeout( () => blocked = false, ms );
	}, err => {
		destination.error( err );
	}, () => {
		destination.close();
	});

	return destination;
}
