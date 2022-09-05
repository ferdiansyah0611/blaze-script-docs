# List Rendering

To create a rendering list, it can be without a key or with a key. But there is a slight difference in the two things. It is highly recommended to use the key.

## Without For

```tsx
<div>
    {this.state.user.map((item: any) => (
        <div>
            <Item item={item} key={item.title} />
        </div>
    ))}
</div>
```

Without for, it has the disadvantage that if one data in the array is deleted and has a component that is under children as in the example above, it will only delete the component element, not its main children. As follows

```html
<div>
    <!-- data has been deleted but children not deleted (on component) -->
    <div></div>
    <div>
        <div data-n="Item" data-i="1">hello world</div>
    </div>
    <div>
        <div data-n="Item" data-i="2">hello world</div>
    </div>
</div>
```

## With for

But with for has the opposite function than without for as above.

```tsx
<div for>
    {this.state.user.map((item: any) => (
        <div>
            <Item item={item} key={item.title} />
        </div>
    ))}
</div>
```

If any data is deleted and the children have components, then the element will be deleted on the main children.

```html
<div>
    <!-- component with key 0 children element is nothing -->
    <div>
        <div data-n="Item" data-i="1">hello world</div>
    </div>
    <div>
        <div data-n="Item" data-i="2">hello world</div>
    </div>
</div>
```