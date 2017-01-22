const Queue = require('../../../src/client/utils/queue').default;

describe('Utils - Queue', () => {
	const queue = new Queue(8);

	it('should add items to the queue', () => {
		queue.add('a');
		expect(queue.size()).toBe(1);

		queue.add('b');
		expect(queue.size()).toBe(2);
	});

	it('should not grow beyond size 8', () => {
		queue.add('c').add('d').add('e').add('f').add('g').add('h').add('i').add('j').add('k');
		expect(queue.size()).toBe(8);

		queue.add('l').add('m').add('n').add('o');
		expect(queue.size()).toBe(8);
	});

	it('should return the first item (10 but last added item)', () => {
		expect(queue.first()).toBe('h');
	});

	it('should return the last added item', () => {
		expect(queue.last()).toBe('o');
	});
});
