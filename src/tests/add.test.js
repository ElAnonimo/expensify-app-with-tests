const add = (a, b) => a + b;
const greet = (name = 'default name') => `Hello ${name}`;

test('should add two numbers', () => {
	const result = add(5, 5);
	expect(result).toBe(10);
});

test('should greet', () => {
	const result = greet('Mikki');
	expect(result).toBe('Hello Mikki');
});

test('should greet with the default name', () => {
	const result = greet();
	expect(result).toBe('Hello default name');
});
