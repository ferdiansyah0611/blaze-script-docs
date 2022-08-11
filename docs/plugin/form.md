# Form

Form validation for blaze script

```tsx
import useForm from "@root/plugin/form";
```

```tsx
export function List() {
	init(this, "auto");
	state("data", {
		list: ["typescript", "node js", "vdom"],
		input: "",
		validate: []
	});
	const submit = () => {
		this.data.list.push(this.data.input);
		this.data.input = "";
	};
	useForm("validate", (err) => this.data.validate = err, {
		input: {
			isInt: true,
		}
	}, submit, this)
	render(() => (
		<div>
			<input name="input" live type="text" model="data.input" />
			<button onClick={this.validate}>Submit</button>
		</div>
	));
}
```

## Validator

List of validator

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>min</td>
			<td>number</td>
		</tr>
		<tr>
			<td>max</td>
			<td>number</td>
		</tr>
		<tr>
			<td>required</td>
			<td>boolean</td>
		</tr>
		<tr>
			<td>pattern</td>
			<td>regex</td>
		</tr>
		<tr>
			<td>list</td>
			<td>Array</td>
		</tr>
		<tr>
			<td>isEmail</td>
			<td>boolean</td>
		</tr>
		<tr>
			<td>isInt</td>
			<td>boolean</td>
		</tr>
		<tr>
			<td>isFloat</td>
			<td>boolean</td>
		</tr>
		<tr>
			<td>isDate</td>
			<td>boolean</td>
		</tr>
		<tr>
			<td>message</td>
			<td>string</td>
		</tr>
	</tbody>
</table>