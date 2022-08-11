```tsx
export function List() {
	init(this, "auto");
	state("data", {
		list: ["typescript", "node js", "vdom"],
		input: "",
	});
	const submit = () => {
		this.data.list.push(this.data.input);
		this.data.input = "";
	};
	const remove = (text) => (this.data.list = this.data.list.filter((item) => item !== text));
	render(() => (
		<div>
			<ul className="flex flex-col">
				{this.data.list.map((item) => (
					<li key={item}>
						<span>{item} </span>
						<button onClick={() => remove(item)}>delete</button>
					</li>
				))}
			</ul>
			<input live placeholder="Type Here" className="bg-gray-900 text-white" type="text" model="data.input" />
			<div>
				<p>Your Input: {this.data.input}</p>
				<button onClick={submit}>Submit</button>
			</div>
		</div>
	));
}
```