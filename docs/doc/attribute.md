# Attribute

This section about attribute element.

## style

Work on string or object

```tsx
<section>
	<div style="display: none;"></div>
	<div style={{ display: "none" }}></div>
</section>
```

## class

Can use class or className, if array the class automatically join as a string

```tsx
<section>
	<div class="flex"></div>
	<div className="flex"></div>
	{/*auto join*/}
	<div className={["flex", "justify-center"]}></div>
</section>
```

## setHTML

By default, setHTML auto remove script tag for security

```tsx
<section>
	<section setHTML="<p>Hello World</p>"></section>
</section>
```

## svg

SVG element only work in "svg", "path", "g", "circle", "ellipse", "line". But if element nothing in list, you can use attribute `svg=""`.

```tsx
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px">
	 <path fill="none" />
</svg>
```

## if & else

Not recommendation if children is component because will call a component.

```tsx
<section>
	<div class="text-white">
		<p if={true}>true</p>
		<p else>false</p>
	</div>
</section>
```

## refs

Get current node.

```tsx
<section>
	<button refs="btn">btn</button>
	<button refs="mybtn" i={0}>btn 2</button>
</section>

effect(() => {
	// Access Refs
	console.log(this.btn);
	console.log(this.mybtn[0]);
})
```

## skip

skip diffing a children

```tsx
<section>
	<article skip setHTML="<p>hello world</p>"></article>
</section>
```

## diff

skip diffing a attribute, don't add this attribute if element interact with state/props/context.

```tsx
<section>
	<p diff>hello world</p>
	<p diff>hello world</p>
	<p diff>hello world</p>
	<p diff>hello world</p>
	<p diff>hello world</p>
</section>
```

## content

by default, text node only work with state in (SPAN, P, H1, H2, H3, H4, H5, H6, A, BUTTON, CODE). But for different elements, must use the `content` attribute.

```tsx
<div content>
	hello world {this.state.example}
</div>
```

## on:show

Toggle style display none

```tsx
<section>
	<div on:show={true}>
		<p>I'm show element</p>
	</div>
</section>
```

## on:toggle

Event listener reverse for a state or context

```tsx
<section>
	<button on:toggle="state.open">toggle</button>
</section>
```

## on:active

toggle class `active`

```tsx
<section>
	<button on:active={true}>toggle</button>
</section>
```