export default class Queue {
	private elements = [];
	private maxSize = 10;

	constructor(maxSize) {
		if (maxSize != null) {
			this.maxSize = maxSize;
		}
	}

	public add(element) {
		if (this.elements.length === this.maxSize) {
			this.elements = this.elements.slice(1);
		}
		this.elements = this.elements.concat(element);

		return this;
	}

	public first() {
		return this.elements[0];
	}

	public last() {
		return this.elements[this.elements.length - 1];
	}

	public size() {
		return this.elements.length;
	}
}
